-- Lấy danh sách tất cả đơn hàng.
SELECT * FROM orders;
-- Lấy thông tin chi tiết về một đơn hàng cụ thể.
SELECT * FROM orders WHERE orderId = 1; -- Procedure
-- Tìm kiếm đơn hàng theo mã đơn hàng, khách hàng, ngày đặt hàng, v.v.
SELECT * FROM orders WHERE orderId = 1;
SELECT * FROM orders WHERE customerId = 1;
SELECT * FROM orders WHERE DAY(orderDate) = 1 AND MONTH(orderDate) = 3 AND YEAR(orderDate) = 2024;
-- Lọc đơn hàng theo trạng thái (đang chờ xử lý, đã thanh tán, đã giao hàng, v.v.). (thêm status)
SELECT * FROM orders WHERE status = 'Đang chờ xử lý';
SELECT * FROM orders WHERE status = 'Đã thanh tán';
SELECT * FROM orders WHERE status = 'Đã giao hàng';
SELECT * FROM orders WHERE status = 'Đã hủy';
-- Thêm đơn hàng mới.
INSERT INTO orders (customerId, productId, quantity, orderDate, shippingAddress)
VALUES (1, 5, 10, '2024-03-24', 'cau giay');
-- Cập nhật trạng thái đơn hàng.
UPDATE orders SET status = 'Đã giao hàng' WHERE orderId = 1;
-- Hủy đơn hàng.
UPDATE orders SET status = 'Đã hủy' WHERE orderId = 1;
--or
DELETE FROM orders WHERE orderId = 1;