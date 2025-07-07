from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.params import Query

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

length_units = {
    "millimeter": 0.001,
    "centimeter": 0.01,
    "meter": 1,
    "kilometer": 1000,
    "inch": 0.0254,
    "foot": 0.3048,
    "yard": 0.9144,
    "mile": 1609.34,
}

weight_units = {
    "milligram": 0.001,
    "gram": 1,
    "kilogram": 1000,
    "ounce": 28.3495,
    "pound": 453.592,
}

@app.get("/length")
def length(value: float = Query(...), from_unit: str = Query(...), to_unit: str = Query(...)):
    try:
        result = value * length_units[from_unit] / length_units[to_unit]
        return {"Result": result}
    except:
        return {"Error": "Invalid length unit"}


@app.get("/weight")
def weight(value: float = Query(...), from_unit: str = Query(...), to_unit: str = Query(...)):
    try:
        result = value * weight_units[from_unit] / weight_units[to_unit]
        return {"Result": result}
    except:

        return {"Error": "Invalid weight unit"}

@app.get("/temperature")
def temperature(value: float = Query(...), from_unit: str = Query(...), to_unit: str = Query(...)):
    try:

        # градус Цельсия (°C), градус Фаренгейта (°F), и Кельвин (K).
        if from_unit == to_unit:
            return {"result": value}

        if from_unit == "celsius":
            if to_unit == "fahrenheit":
                return {"result": ((value * (9/5)) + 32)}
            elif to_unit == "kelvin":
                return {"result": (value + 273.15)}

        elif from_unit == "fahrenheit":
            if to_unit == "celsius":
                return {"result": ((value -32) * (5/9))}
            elif to_unit == "kelvin":
                return {"result": ((value -32) * (5/9) + 273.15)}

        elif from_unit == "kelvin":
            if to_unit == "fahrenheit":
                return {"result": ((value - 273.15) * (9/5) + 32)}
            elif to_unit == "celsius":
                return {"result": (value - 273.15)}

        return {"error": "Invalid temperature conversion"}

    except Exception as e:
        return {"error": str(e)}




        