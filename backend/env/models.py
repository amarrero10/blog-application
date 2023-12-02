from pydantic import BaseModel, Field

class Blog(BaseModel):
    id: str = Field(..., alias="_id")
    title: str
    body: str
