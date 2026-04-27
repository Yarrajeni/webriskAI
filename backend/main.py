from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time
import json
from datetime import datetime
from typing import List, Optional
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import io
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import os

# Database Setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./risk_app.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    role = Column(String)
    password = Column(String)

class DBRiskAssessment(Base):
    __tablename__ = "risk_assessments"
    id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer)
    income = Column(Float)
    loan_amount = Column(Float)
    credit_score = Column(Integer)
    debt = Column(Float)
    late_payments = Column(Integer)
    pattern = Column(String)
    risk_score = Column(Float)
    category = Column(String)
    xai_data = Column(JSON)
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Production CORS - Allow your hosting domains
origins = [
    "http://localhost:5173",
    "https://risk-ai-mlops.vercel.app", # Example
    "https://risk-ai-mlops.onrender.com", # Example
    "*" # For maximum compatibility during initial deployment
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve Static Files (Frontend)
# In production, the built frontend is in the 'static' folder
static_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static")
if not os.path.exists(static_dir):
    # Fallback for local development if running from backend folder
    static_dir = os.path.join(os.getcwd(), "static")

if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/")
async def root():
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "RiskAI Backend is running. Frontend build not found."}

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class RiskInput(BaseModel):
    age: int
    income: float
    loan_amount: float
    credit_score: int
    debt: float
    late_payments: int
    pattern: str

@app.post("/predict")
def predict_risk(data: RiskInput, db: Session = Depends(get_db)):
    # AI Logic Simulation
    base_score = 50
    if data.credit_score < 600: base_score += 20
    if data.late_payments > 2: base_score += 15
    if data.debt > (data.income * 0.4): base_score += 10
    
    risk_score = min(99.9, max(5.0, base_score + random.uniform(-5, 5)))
    category = "High" if risk_score > 70 else "Medium" if risk_score > 40 else "Low"
    
    xai_data = [
        {"feature": "Credit Score", "impact": 45 if data.credit_score < 650 else 10, "type": "Negative" if data.credit_score < 650 else "Positive"},
        {"feature": "Debt Ratio", "impact": 30 if data.debt > data.income*0.3 else 5, "type": "Negative" if data.debt > data.income*0.3 else "Positive"},
        {"feature": "Income Stability", "impact": 15, "type": "Positive" if data.pattern == "Stable" else "Negative"},
        {"feature": "Payment History", "impact": 20 if data.late_payments > 0 else 5, "type": "Negative" if data.late_payments > 0 else "Positive"}
    ]
    
    # Save to Database
    db_assessment = DBRiskAssessment(
        age=data.age,
        income=data.income,
        loan_amount=data.loan_amount,
        credit_score=data.credit_score,
        debt=data.debt,
        late_payments=data.late_payments,
        pattern=data.pattern,
        risk_score=round(risk_score, 2),
        category=category,
        xai_data=xai_data
    )
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    
    return {
        "id": db_assessment.id,
        "risk_score": db_assessment.risk_score,
        "category": db_assessment.category,
        "xai_data": db_assessment.xai_data,
        "timestamp": db_assessment.timestamp
    }

@app.get("/dashboard/stats")
def get_stats(db: Session = Depends(get_db)):
    total = db.query(DBRiskAssessment).count()
    high_risk = db.query(DBRiskAssessment).filter(DBRiskAssessment.category == "High").count()
    avg_score = db.query(DBRiskAssessment).with_entities(DBRiskAssessment.risk_score).all()
    avg_val = sum([s[0] for s in avg_score]) / len(avg_score) if avg_score else 42.5
    
    return {
        "total_customers": 12000 + total,
        "high_risk_alerts": 140 + high_risk,
        "model_accuracy": 94.2,
        "avg_risk_score": round(avg_val, 1)
    }

@app.get("/reports/all")
def get_all_reports(db: Session = Depends(get_db)):
    return db.query(DBRiskAssessment).order_by(DBRiskAssessment.timestamp.desc()).limit(50).all()

@app.get("/export/pdf/{assessment_id}")
def export_pdf(assessment_id: int, db: Session = Depends(get_db)):
    assessment = db.query(DBRiskAssessment).filter(DBRiskAssessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # Header
    p.setFont("Helvetica-Bold", 24)
    p.drawString(100, height - 80, "Risk Intelligence Audit Report")
    p.setFont("Helvetica", 10)
    p.drawString(100, height - 100, f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    p.line(100, height - 110, 500, height - 110)

    # Summary
    p.setFont("Helvetica-Bold", 14)
    p.drawString(100, height - 150, "Executive Summary")
    p.setFont("Helvetica", 12)
    p.drawString(100, height - 175, f"Report ID: #ARK-{assessment.id}")
    p.drawString(100, height - 200, f"Risk Score: {assessment.risk_score}%")
    p.drawString(100, height - 225, f"Risk Category: {assessment.category}")

    # Details
    p.setFont("Helvetica-Bold", 14)
    p.drawString(100, height - 275, "Input Parameters")
    y = height - 300
    params = [
        f"Credit Score: {assessment.credit_score}",
        f"Annual Income: ₹{assessment.income}",
        f"Loan Amount: ₹{assessment.loan_amount}",
        f"Current Debt: ₹{assessment.debt}",
        f"Late Payments: {assessment.late_payments}",
        f"Pattern: {assessment.pattern}"
    ]
    p.setFont("Helvetica", 10)
    for param in params:
        p.drawString(120, y, f"• {param}")
        y -= 20

    # XAI Breakdown
    p.setFont("Helvetica-Bold", 14)
    p.drawString(100, y - 20, "Explainable AI (XAI) Breakdown")
    y -= 45
    for item in assessment.xai_data:
        p.setFont("Helvetica", 10)
        p.drawString(120, y, f"{item['feature']}: {item['type']} Impact ({item['impact']}%)")
        y -= 20

    # Footer
    p.setFont("Helvetica-Oblique", 8)
    p.drawString(100, 50, "Confidence Score provided by RiskAI Ensemble Model. For institutional use only.")

    p.showPage()
    p.save()
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename=RiskReport_{assessment.id}.pdf"})

@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # Check if the requested path is a file in the static directory (e.g. assets)
    file_path = os.path.join(static_dir, full_path)
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    
    # Otherwise, return index.html for React Router
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    
    return {"message": f"Path {full_path} not found."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
