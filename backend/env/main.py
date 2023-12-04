from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import (
    fetch_one_blog,
    fetch_all_blogs,
    create_blog,
    update_blog,
    remove_blog,
    collection
)
from models import Blog
from schemas import multiple_blogs, individual_blog

# App
app = FastAPI()

# CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Routes
@app.get("/api/blogs")
async def read_blogs():
    cursor = collection.find({})
    blogs = await cursor.to_list(length=None)  # Convert the cursor to a list
    return multiple_blogs(blogs)

@app.get("/api/blogs/{blog_id}", response_model=Blog)
async def read_blog(blog_id: str):
    response = await fetch_one_blog(blog_id)
    if response:
        return response
    raise HTTPException(404, f"There is no blog with the id {blog_id}")


@app.post("/api/blogs", response_model=Blog)
async def post_blog(data: Blog):
    response = await create_blog(data)
    if response:
        return response
    raise HTTPException(400, "Something went wrong")


@app.put("/api/blogs/{blog_id}", response_model=Blog)
async def put_blog(blog_id: str, data: str):
    response = await update_blog(blog_id, data)
    if response:
        return response
    raise HTTPException(404, f"There is no blog with the id {blog_id}")

@app.delete("/api/blogs/{blog_id}")
async def delete_blog(blog_id: str):
    response = await remove_blog(blog_id)
    if response:
        return "Successfully deleted blog"
    raise HTTPException(404, f"There is no blog with the id {blog_id}")
