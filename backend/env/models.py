from pydantic import BaseModel, Field

class Blog(BaseModel):
    title: str
    body: str
