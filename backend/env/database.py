from models import Blog
from bson import ObjectId
# MongoDB Driver(connection)
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')

database = client.BlogWebsite
collection = database.blogs


from bson import ObjectId

async def fetch_one_blog(blog_id):
    try:
        # Convert the blog_id parameter to ObjectId
        blog_id = ObjectId(blog_id)
        document = await collection.find_one({"_id": blog_id})

        if document:
            # Convert ObjectId to string for the response
            document['_id'] = str(document['_id'])

        return document
    except Exception as e:
        # Handle any exceptions, e.g., invalid ObjectId format
        print(f"Error fetching blog: {e}")
        return None


async def fetch_all_blogs():
    blogs = []
    cursor = collection.find({})
    async for document in cursor:
        blog_data = document.copy()
        blog_data['_id'] = str(blog_data.pop('_id'))
        blogs.append(Blog(**blog_data))
    return blogs

async def create_blog(blog):
    document = blog
    result = await collection.insert_one(document)
    return blog

async def update_blog(blog_id, data):
    blog_id = ObjectId(blog_id)

    # Update the blog
    await collection.update_one({"_id": blog_id}, {"$set": {"body": data}})

    # Fetch the updated document
    document = await collection.find_one({"_id": blog_id})

    if document:
        # Convert ObjectId to string for the response
        document['_id'] = str(document['_id'])

    return document

async def remove_blog(blog_id):
    result = await collection.delete_one({"_id": blog_id})
    return result.deleted_count > 0
