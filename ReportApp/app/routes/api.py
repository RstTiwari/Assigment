from fastapi import APIRouter, HTTPException, Request
from fastapi.encoders import jsonable_encoder

router = APIRouter()


@router.get("/", response_model=dict)
async def get_server_status():
    return {"message": "Server is running"}


@router.post("/reports", response_model=dict)
async def generate_reports(request: Request):
    try:
        products = fetch_inventory_data(request)

        product_trends = analyze_product_trends(products)

        out_of_stock = find_out_of_stock_products(products)
        inventory_value = calculate_inventory_value(products)

        report = {
            "product_trends": product_trends,
            "out_of_stock_products": out_of_stock,
            "total_inventory_value": inventory_value,
        }

        return {"success": 1, "report": report}
    except Exception as e:
        print("Error occurred:", str(e))
        raise HTTPException(
            status_code=500, detail="An error occurred while generating the report"
        )

        print("Error occurred:", str(e))

        raise HTTPException(
            status_code=500, detail="An error occurred while generating the report"
        )


def fetch_inventory_data(request: Request):
    products_collection = request.app.database["Product"]
    products = list(products_collection.find())
    for product in products:
        product["_id"] = str(product["_id"])
    return products


def analyze_product_trends(products: list[dict]):
    trends = sorted(products, key=lambda x: x.get("unitsSold", 0), reverse=True)
    return trends[:5]


def find_out_of_stock_products(products: list[dict]):
    return [product for product in products if product.get("quantity", 0) == 0]


def calculate_inventory_value(products: list[dict]):
    return sum(
        product.get("price", 0) * product.get("quantity", 0) for product in products
    )
