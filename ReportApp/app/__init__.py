from fastapi import FastAPI
from app.routes.api import router  # Make sure the import path matches your structure

def create_app() -> FastAPI:
    app = FastAPI()
    # Include the router without any prefix
    app.include_router(router, prefix="")
    return app
