# OCR Service — ActivityHub

Mock FastAPI service for certificate text extraction and verification.

## Status: Mock Implementation

Currently returns realistic sample responses. Real OCR integration is planned for Phase 4.

## Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run the service
uvicorn main:app --reload --port 8000
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Service health check |
| POST | /extract | Extract certificate data (mock) |
| GET | /docs | Swagger UI documentation |

## TODO (Phase 4)

- [ ] Integrate EasyOCR or Tesseract for real text extraction
- [ ] Add OpenCV preprocessing pipeline
- [ ] Implement duplicate detection via perceptual hashing
- [ ] Add fake-certificate risk scoring
- [ ] Add Dockerfile for containerized deployment
