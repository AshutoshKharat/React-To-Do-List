# Import the Todo model from the model module
from model import Todo

# Import the motor library for asynchronous MongoDB operations
import motor.motor_asyncio

# Create an asynchronous MongoDB client instance to connect to the MongoDB server
# The connection string specifies that MongoDB is running on localhost at port 27017 (corrected from 27107)
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")

# Access the 'TodoList' database from the connected MongoDB client
database = client.TodoList

# Access the 'todo' collection within the 'TodoList' database
collection = database.todo

# Asynchronously fetch a single todo document by title from the MongoDB collection
async def fetch_one_todo(title):
    # Await the result of finding one document with the specified title
    document = await collection.find_one({"title": title})
    return document

# Asynchronously fetch all todo documents from the MongoDB collection
async def fetch_all_todo():
    todos = []
    # Create a cursor to iterate over all documents in the collection
    cursor = collection.find({})
    # Asynchronously iterate over each document in the cursor
    async for document in cursor:
        # Append each document to the todos list, creating a Todo instance from the document's data
        todos.append(Todo(**document))
    return todos

# Asynchronously create a new todo document in the MongoDB collection
async def create_todo(todo):
    result = await collection.insert_one(todo)
    return todo

# Asynchronously update an existing todo document in the MongoDB collection
async def update_todo(title, desc):
    await collection.update_one({"title": title}, {"$set": {"description": desc}})
    document = await collection.find_one({"title": title})
    return document

# Asynchronously remove a todo document from the MongoDB collection
async def remove_todo(title):
    await collection.delete_one({"title": title})
    return True
