import os
from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from .routes.api import router
from . import create_app

load_dotenv()
DatabaseString = os.getenv("DatabaseString")
Port = int(os.getenv("Port", 8000))  # Default to 8000 if not set

app = FastAPI()
app.include_router(router)



client = MongoClient(DatabaseString)
app.database = client.get_default_database("ftms")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=Port)  # Use the custom port
