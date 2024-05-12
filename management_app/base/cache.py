import json
import time
from django.core.cache import cache

from management_app.base.models import Product


#
def getData(model):
    # Truy vấn dữ liệu từ SQL
    data = model.objects.all()
    return data

# def my_view(request):
#     key = getKey(request)
#     cached_data = cache.get(key)
#     if not cached_data:
#         data_to_cache = retrieve_data_based_on_request(request)
#         cache.set(key, data_to_cache, timeout=3600)
#         return data_to_cache
#     return cached_data
def cacheProduct(product_id):
    try:
        # Lấy thông tin sản phẩm từ cơ sở dữ liệu SQL
        product = Product.objects.get(id=product_id)
        product_info = {
            'name': product.productName,
            'price': float(product.price),  # Chuyển đổi Decimal sang float
            'description': product.description,
            'stock_quantity': product.stock_quantity,
            'inStock': product.inStock
        }

        # Serialize thông tin sản phẩm thành JSON
        product_data = json.dumps(product_info)

        # Lưu thông tin sản phẩm vào Redis Cloud
        cache.set(f'product:{product_id}', product_data, timeout=60)  # 
        print(f"Thông tin sản phẩm {product_id} đã được lưu vào cache.")
    except Product.DoesNotExist:
        print(f"Sản phẩm với ID {product_id} không tồn tại.")
    except Exception as e:
        print(f'Lỗi khi lưu thông tin sản phẩm: {e}')

def cacheTest(product_id):
    # Lưu thông tin sản phẩm vào Redis Cloud
        cache.set(f'product:{product_id}', 1, timeout=60)  #
def getCacheTest(product_id):
        cache.hget(f'product:{product_id}', 'info')
def getCacheProduct(product_id):
    try:
        # Lấy thông tin 
        product_data = cache.hget(f'product:{product_id}', 'info')
        
        if product_data:
            
            product_info = json.loads(product_data)
            return product_info
        else:
            # Nếu không tìm thấy dữ liệu, có thể trả về None hoặc xử lý theo cách khác
            return None
    except Exception as e:
        raise Exception(f'Error retrieving product data: {e}')


def cacheReview(product_id, reviews):
    try:
        reviews_data = [json.dumps(review) for review in reviews]

        cache.sadd(f'reviews:{product_id}', *reviews_data)

        cache.expire(f'reviews:{product_id}', 3600)
    except Exception as e:
        raise Exception(f'Error caching reviews: {e}')

def getCacheReview(product_id):
    try:
        reviews_data = cache.smembers(f'reviews:{product_id}')

        if reviews_data:
            reviews = [json.loads(review) for review in reviews_data]
        else:
            reviews = []
        
        return reviews
    except Exception as e:
        raise Exception(f'Error retrieving reviews: {e}')


def cacheUser(user_id, user_info):
    try:
        user_data = json.dumps(user_info)
        
        cache.hset(f'user:{user_id}', mapping={'info': user_data})

        cache.expire(f'user:{user_id}', 3600)  # 1 giờ
    except Exception as e:
        raise Exception(f'Error caching user data: {e}')

def getCacheUser(user_id):
    try:
        user_data_json = cache.hget(f'user:{user_id}', 'info')
        
        if user_data_json:
            return json.loads(user_data_json)
        else:
            return None
    except Exception as e:
        raise Exception(f'Error retrieving user data: {e}')

def cacheHistory(user_id, history):
    # Lưu lịch sử của người dùng vào List với key là 'user_history:{user_id}'
    cache.lpush(f'user_history:{user_id}', *history)

def getCacheHistory(user_id):
    # Lấy lịch sử của người dùng từ Redis
    user_history = cache.lrange(f'user_history:{user_id}', 0, -1)
    # Trả về lịch sử dưới dạng list Python
    return user_history

def cacheCart(user_id, cart_info):
    # Chuyển đổi thông tin giỏ hàng thành định dạng JSON trước khi lưu vào Redis
    cart_data = json.dumps(cart_info)
    # Lưu thông tin giỏ hàng vào Hash với key là 'user_cart:{user_id}'
    cache.hset(f'user_cart:{user_id}', mapping=cart_data)

def getCacheCart(user_id):
    # Lấy thông tin giỏ hàng của người dùng từ Redis
    cart_data_json = cache.hget(f'user_cart:{user_id}')
    if cart_data_json:
        # Nếu có dữ liệu, chuyển đổi từ JSON sang Python object và trả về
        return json.loads(cart_data_json)
    else:
        # Nếu không có dữ liệu trong cache, trả về None
        return None

def cacheApi(api_name, api_params, api_result):
    # Chuyển đổi kết quả của API thành định dạng JSON trước khi lưu vào Redis
    api_result_json = json.dumps(api_result)
    # Tạo key duy nhất cho API dựa trên tên API và các tham số
    api_key = f'{api_name}:{json.dumps(api_params)}'
    # Lưu kết quả của API vào Hash với key là 'api_result:{api_key}'
    cache.hset('api_result', api_key, api_result_json)

def getCacheApi(api_name, api_params):
    # Tạo key duy nhất cho API dựa trên tên API và các tham số
    api_key = f'{api_name}:{json.dumps(api_params)}'
    # Lấy kết quả của API từ Redis
    api_result_json = cache.hget('api_result', api_key)
    if api_result_json:
        # Nếu có dữ liệu, chuyển đổi từ JSON sang Python object và trả về
        return json.loads(api_result_json)
    else:
        # Nếu không có dữ liệu trong cache, trả về None
        return None
