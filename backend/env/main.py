from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import (
    fetch_one_blog,
    fetch_all_blogs,
    create_blog,
    update_blog,
    remove_blog
)
from models import Blog

# App
app = FastAPI()

# CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Routes
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api/blogs")
async def read_blogs():
    response = await fetch_all_blogs()
    return response

@app.get("/api/blogs/{title}", response_model=Blog)
async def read_blog(title: str):
    response = await fetch_one_blog(title)
    if response:
        return response
    raise HTTPException(404, f"There is no blog with the title {title}")

@app.post("/api/blogs", response_model=Blog)
async def post_blog(data:Blog):
    response = await create_blog(data.model_dump())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.put("/api/blogs/{title}", response_model=Blog)
async def put_blog(title: str, data: str):
    response = await update_blog(title, data)
    if response:
        return response
    raise HTTPException(404, f"There is no blog with the title {title}")


@app.delete("/api/blogs/{title}")
async def delete_blog(title: str):
    response = await remove_blog(title)
    if response:
        return "Successfully deleted blog"
    raise HTTPException(404, f"There is no blog with the title {title}")
