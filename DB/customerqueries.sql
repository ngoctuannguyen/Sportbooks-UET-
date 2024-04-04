-- Lấy danh sách tất cả khách hàng.
SELECT * FROM customers;
-- Lấy thông tin chi tiết về một khách hàng cụ thể.
DELIMITER //

CREATE PROCEDURE getCustome (IN p_customerId INT)
BEGIN
    SELECT *
    FROM customers
    WHERE customerId = p_customerId;
END;
//
DELIMITER ;


-- Tìm kiếm khách hàng theo tên, email, số điện thoại, v.v.
DELIMITER //
CREATE PROCEDURE SearchCustomer (IN p_searchTerm VARCHAR(255))
BEGIN
    SELECT *
    FROM customers
    WHERE customerName LIKE CONCAT(p_searchTerm, '%') -- tên
       OR phone = p_searchTerm -- số điện thoại 
       OR email LIKE CONCAT(p_searchTerm, '%'); -- email 
END //
DELIMITER ;


-- Thêm khách hàng mới.
INSERT INTO customers (customerName, email, address, phone)
VALUES ('John', 'john@example.com', 'hai ba trung', '1234567890');
-- Cập nhật thông tin khách hàng.
UPDATE customers SET email = 'newemail@example.com', phone = '9876543210' WHERE customerId = 'customerId'; --customerId lấy được 

-- Xóa khách hàng.
DELETE FROM customers WHERE customerId = p_customerId; -- Xóa đơn giản như này thì chắc không cần procedure đâu
-- DELIMITER //

-- CREATE PROCEDURE DeleteCustomer (IN p_customerId INT)
-- BEGIN
--     DELETE FROM customers WHERE customerId = p_customerId;
-- END;
-- //
-- DELIMITER ;

-- Tính tổng doanh thu theo khách hàng
SELECT c.customerId, c.customerName, SUM(o.quantity * p.price) AS total_revenue
FROM customers c
LEFT JOIN orders o ON c.customerId = o.customerId
LEFT JOIN products p ON o.productId = p.productId
GROUP BY c.customerId;
-- Xem đơn hàng theo trạng thái
DELIMITER //

CREATE PROCEDURE GetOrdersByStatus (IN p_status VARCHAR(255))
BEGIN
    IF p_status = '' THEN
        SELECT *
        FROM customers c
        LEFT JOIN orders o ON c.customerId = o.customerId;
    ELSE
        SELECT *
        FROM customers c
        LEFT JOIN orders o ON c.customerId = o.customerId
        WHERE o.status = p_status;
    END IF;
END;
//

DELIMITER ;

-- ** Nếu chưa thì sao ?
-- Trạng thái: Đã giao cho đơn vị vận chuyển, chờ xác nhận, Hàng bị hủy,...