def individual_blog(blog) -> dict:
    return {
        "id": str(blog["_id"]),
        "title": blog["title"],
        "body": blog["body"],
    }

def multiple_blogs(blogs) -> list:
    return [individual_blog(blog) for blog in blogs]
