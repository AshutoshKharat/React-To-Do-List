# Import the BaseModel class from the pydantic library
from pydantic import BaseModel

# Define a Pydantic model for a Todo item
class Todo(BaseModel):
    title: str
    description: str
