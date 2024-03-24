-- Lấy danh sách tất cả khách hàng.
SELECT * FROM customers;
-- Lấy thông tin chi tiết về một khách hàng cụ thể.
SELECT * FROM customers WHERE customerId = 1;
-- Tìm kiếm khách hàng theo tên, email, số điện thoại, v.v.
SELECT * FROM customers WHERE customerName LIKE '%[tên]%';
SELECT * FROM customers WHERE phone = '0486928496';
SELECT * FROM customers WHERE email = '%[email]%';
-- Thêm khách hàng mới.
INSERT INTO customers (customerName, email, address, phone)
VALUES ('John', 'john@example.com', 'hai ba trung', '1234567890');
-- Cập nhật thông tin khách hàng.
UPDATE customers SET email = 'newemail@example.com', phone = '9876543210' WHERE customerId = 1;
-- Xóa khách hàng.
DELETE FROM customers WHERE customerId = 1;
-- Tính tổng doanh thu theo khách hàng
SELECT c.customerId, c.customerName, SUM(o.quantity * p.price) AS total_revenue
FROM customers c
LEFT JOIN orders o ON c.customerId = o.customerId
LEFT JOIN products p ON o.productId = p.productId
GROUP BY c.customerId;
-- Xem đơn hàng theo trạng thái
SELECT *
FROM customers c
LEFT JOIN orders o ON c.customerId = o.customerId
WHERE o.status = 'Đã giao hàng';