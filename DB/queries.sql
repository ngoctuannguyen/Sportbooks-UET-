-- Lấy danh sách sản phẩm :
    SELECT * FROM products;
-- Lấy thông tin chi tiết về một sản phẩm:
    SELECT * FROM products WHERE productId = id;
    SELECT * FROM products WHERE productName = 'name';
-- Tìm kiểm sản phẩm theo tên:
    SELECT * FROM products WHERE productName LIKE '%name%'; -- chưa tối ưu
-- Theo danh mục:
    SELECT * FROM products p JOIN categories c ON p.catId = c.catId WHERE c.catName = 'category';
-- theo giá cả:
    SELECT * FROM products WHERE price >= min_price AND price <= max_price;
--Theo thương hiệu
    SELECT * FROM products WHERE brand = 'brand';
-- Thêm sản phẩm mới:
    INSERT INTO products (productName, catId, description, price, stock_quantity, productImage)
VALUES ('', , '', ,, '');
-- Cập nhập thông tin sản phẩm:
    UPDATE products 
    SET productName = 'Updated Product Name', 
    description = 'Updated Description', 
    price = 29.99, 
    stock_quantity = 150, 
    productImage = 'updated_product_image.jpg' 
    WHERE productId = id;
-- Xóa sản phẩm:
    DELETE FROM products WHERE productId = id;
-- Xem danh sách sản phẩm theo danh mục:
    SELECT p.* 
    FROM products p 
    JOIN categories c ON p.catId = c.catId 
    WHERE c.catName = 'category';
-- Thống kê sản phẩm tồn kho
    -- Theo tổng: 
        SELECT SUM(stock_quantity) AS total_stock FROM products;
    -- Theo từng sản phẩm:
        SELECT c.catName, SUM(p.stock_quantity) AS total_stock
        FROM products p
        JOIN categories c ON p.catId = c.catId
        GROUP BY c.catName;




