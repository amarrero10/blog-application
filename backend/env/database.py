from models import Blog

# MongoDB Driver(connection)
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')

database = client.BlogWebsite
collection = database.blogs


async def fetch_one_blog(title):
    document = await collection.find_one({"title": title})
    return document

async def fetch_all_blogs():
    blogs = []
    cursor = collection.find({})
    async for document in cursor:
        blogs.append(Blog(**document))
    return blogs

async def create_blog(blog):
    document = blog
    result = await collection.insert_one(document)
    return document

async def update_blog(title, data):
    await collection.update_one({"title": title}, {"$set": {
        "body": data}})
    document = await collection.find_one({"title": title})
    return document

async def remove_blog(title):
    await collection.delete_one({"title": title})
    return True
