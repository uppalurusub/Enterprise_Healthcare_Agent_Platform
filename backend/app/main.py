"""
main.py

Enterprise Healthcare Agent Platform

Application Entry Point

Features
--------
- FastAPI
- Loguru Logging
- Health Check
- Startup/Shutdown Events
- CORS
- OpenAPI
- Request Logging
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.utils.logger import logger

from app.router.healthcare_router import router


# ---------------------------------------------------------
# Lifespan Events
# ---------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifecycle management.
    """

    logger.info("=" * 80)
    logger.info("Starting Enterprise Healthcare Agent Platform...")
    logger.info("=" * 80)

    logger.info("Application startup completed.")

    yield

    logger.info("=" * 80)
    logger.info("Shutting down Enterprise Healthcare Agent Platform...")
    logger.info("=" * 80)

    logger.info("Application shutdown completed.")


# ---------------------------------------------------------
# FastAPI App
# ---------------------------------------------------------

app = FastAPI(
    title="Enterprise Healthcare Agent Platform",
    description="""
Enterprise Multi-Agent AI Platform

Powered by

• AutoGen AgentChat 0.7.5
• FastAPI
• Loguru
• OpenAI
""",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)


# ---------------------------------------------------------
# Middleware
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# Include Routers
# ---------------------------------------------------------

app.include_router(
    router,
    prefix="/api/v1",
    tags=["Enterprise Healthcare Agent Platform"],
)


# ---------------------------------------------------------
# Root Endpoint
# ---------------------------------------------------------

@app.get(
    "/",
    tags=["Root"],
)
async def root():
    logger.info("Root endpoint accessed.")

    return {
        "application": "Enterprise Healthcare Agent Platform",
        "version": "1.0.0",
        "framework": "FastAPI",
        "autogen": "0.7.5",
        "status": "Running",
    }


# ---------------------------------------------------------
# Health Endpoint
# ---------------------------------------------------------

@app.get(
    "/health",
    tags=["Health"],
)
async def health():

    logger.info("Health check requested.")

    return {
        "status": "Healthy",
        "application": "Enterprise Healthcare Agent Platform",
    }


# ---------------------------------------------------------
# Readiness Endpoint
# ---------------------------------------------------------

@app.get(
    "/ready",
    tags=["Health"],
)
async def readiness():

    logger.info("Readiness check requested.")

    return {
        "status": "Ready",
    }


# ---------------------------------------------------------
# Liveness Endpoint
# ---------------------------------------------------------

@app.get(
    "/live",
    tags=["Health"],
)
async def liveness():

    logger.info("Liveness check requested.")

    return {
        "status": "Alive",
    }


# ---------------------------------------------------------
# Global Exception Handler
# ---------------------------------------------------------

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):

    logger.exception(f"Unhandled exception: {exc}")

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": str(exc),
        },
    )


