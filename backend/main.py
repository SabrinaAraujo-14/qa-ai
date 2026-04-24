from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.test_generator import TestGenerator
from typing import Dict, Any

app = FastAPI(title="QA.AI - Test Generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequirementInput(BaseModel):
    requirement: str

@app.post("/generate-tests", response_model=Dict[str, Any])
async def generate_tests(input: RequirementInput):
    try:
        result = TestGenerator.generate_tests(input.requirement)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "QA.AI API - Gerador de Testes"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)