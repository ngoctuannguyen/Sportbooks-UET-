
from management_app.base.cache import cacheTest,getCacheTest
from management_app.base.models import Product


product_id = 1
product_info = {
    'productName': 'Điện Thoại XYZ',
    'catId': 2,  # Giả sử ID này liên kết với một danh mục có sẵn trong bảng 'categories'
    'description': 'Điện thoại XYZ với màn hình 6 inch, camera 12MP.',
    'price': 499.99,  # Giá sản phẩm
    'stock_quantity': 50,  # Số lượng tồn kho
    'inStock': True  # Có sẵn trong kho
}



cacheTest(product_id)
# Lưu trữ thông tin sản phẩm với ID 123


# Truy xuất thông tin sản phẩm với ID 123
product_info = getCacheTest(product_id)
print(product_info)