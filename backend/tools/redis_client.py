# redis_client.py
import redis
import os

r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

def get_cached_response(key):
    try:
        return r.get(key)
    except Exception as e:
        print(f"Redis get error: {e}")
        return None

def set_cached_response(key, value, ttl=3600):
    try:
        r.setex(key, ttl, value)
    except Exception as e:
        print(f"Redis set error: {e}")
