"""ActivityHub OCR Service — Mock Implementation

This is a stub/mock OCR service that returns realistic sample responses.
It is designed to be replaced with real OCR (EasyOCR/Tesseract) in a future phase.

TODO: Phase 4 — Replace mock responses with real OCR:
  - Install and configure EasyOCR or Tesseract
  - Implement OpenCV preprocessing for image enhancement
  - Add duplicate certificate detection via perceptual hashing
  - Add fake-certificate risk scoring
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid
import random

app = FastAPI(
    title="ActivityHub OCR Service",
    description="AI-powered certificate text extraction and verification",
    version="0.1.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class OCRResult(BaseModel):
    """Structured OCR extraction result."""
    request_id: str
    student_name: Optional[str] = None
    course_name: Optional[str] = None
    organization: Optional[str] = None
    completion_date: Optional[str] = None
    duration_hours: Optional[float] = None
    confidence: float
    duplicate_risk: bool
    fake_risk: bool
    raw_text: str
    processing_time_ms: int


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    timestamp: str
    ocr_engine: str


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        service="ActivityHub OCR Service",
        version="0.1.0",
        timestamp=datetime.utcnow().isoformat(),
        ocr_engine="mock (EasyOCR/Tesseract planned)",
    )


@app.post("/extract", response_model=OCRResult)
async def extract_certificate(file: UploadFile = File(...)):
    """Extract text and structured data from a certificate image/PDF.

    TODO: Phase 4 — Real implementation:
      1. Validate file type (PDF, JPG, PNG)
      2. If PDF, convert to image using pdf2image
      3. Preprocess image with OpenCV (denoise, threshold, deskew)
      4. Run EasyOCR or Tesseract for text extraction
      5. Use regex/NLP to extract structured fields (name, course, org, date)
      6. Compute perceptual hash for duplicate detection
      7. Run fake-risk heuristics (font consistency, layout analysis)
      8. Return structured result with confidence scores
    """
    # Validate file type
    allowed_types = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file.content_type}. Allowed: PDF, JPG, PNG",
        )

    # Read file (in real implementation, this would be processed)
    contents = await file.read()
    file_size_kb = len(contents) / 1024

    # Mock: Generate realistic sample response
    # TODO: Replace with actual OCR processing
    mock_courses = [
        ("Machine Learning Fundamentals", "Coursera", 40),
        ("Python for Data Science", "NPTEL", 30),
        ("Cloud Computing Essentials", "AWS Training", 20),
        ("Full Stack Web Development", "Udemy", 50),
        ("Cybersecurity Basics", "Cisco Networking Academy", 25),
        ("Data Structures & Algorithms", "GeeksforGeeks", 35),
        ("IoT Workshop Certificate", "IEEE Student Branch", 8),
        ("Hackathon Participation", "Smart India Hackathon", 24),
    ]

    course_name, organization, hours = random.choice(mock_courses)

    return OCRResult(
        request_id=str(uuid.uuid4()),
        student_name="Aarav Shah",  # TODO: Extract from certificate
        course_name=course_name,
        organization=organization,
        completion_date="2026-06-15",  # TODO: Extract from certificate
        duration_hours=hours,
        confidence=round(random.uniform(0.82, 0.98), 2),
        duplicate_risk=random.random() < 0.05,  # 5% chance mock
        fake_risk=random.random() < 0.03,  # 3% chance mock
        raw_text=f"This is to certify that Aarav Shah has successfully completed the course {course_name} offered by {organization}. Duration: {hours} hours. Date of completion: June 15, 2026.",
        processing_time_ms=random.randint(800, 2500),
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
