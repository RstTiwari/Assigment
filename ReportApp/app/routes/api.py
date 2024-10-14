from fastapi import APIRouter, HTTPException, Request
from fastapi.encoders import jsonable_encoder

router = APIRouter()


@router.get("/", response_model=dict)
async def get_server_status():
    return {"message": "Server is running"}


@router.post("/reports", response_model=dict)
async def generate_reports(request: Request):
    try:
        request_body =  request.json()
        print(request_body,request)
        return {"message": "Report generation successful",}
    except Exception as e:
        print("Error occurred:", str(e))

        raise HTTPException(
            status_code=500, detail="An error occurred while generating the report"
        )
