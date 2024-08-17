# Import FastAPI and HTTPException from fastapi
from fastapi import FastAPI, HTTPException

# Import the Todo model
from model import Todo

# Import CORS middleware from fastapi
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app instance
app = FastAPI()

# Import the database functions
from database import (
    fetch_one_todo,
    fetch_all_todo,
    create_todo,
    update_todo,
    remove_todo,
)

# Define allowed origins for CORS
origins = ["http://localhost:3000"]

# Add CORS middleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the root endpoint
@app.get("/")
def read_root():
    return {"Ping": "Pong"}

# Define the endpoint to get all todos
@app.get("/api/todo")
async def get_todo():
    response = await fetch_all_todo()
    return response

# Define the endpoint to get a todo by title
@app.get("/api/todo/{title}", response_model=Todo)
async def get_todo_by_title(title: str):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, 'There is no TODO item with this title')

# Define the endpoint to create a new todo
@app.post("/api/todo", response_model=Todo)
async def post_todo(todo: Todo):
    response = await create_todo(todo.dict())
    if response:
        return response
    raise HTTPException(404, 'Something went wrong')

# Define the endpoint to update an existing todo
@app.put("/api/todo/{title}")
async def put_todo(title: str, desc: str):
    response = await update_todo(title, desc)
    if response:
        return response
    raise HTTPException(404, 'There is no TODO item with this title')

# Define the endpoint to delete a todo
@app.delete("/api/todo/{title}")
async def delete_todo(title: str):
    response = await remove_todo(title)
    if response:
        return "Successfully Deleted ToDo Item"
    raise HTTPException(404, 'There is no TODO item with this title')
