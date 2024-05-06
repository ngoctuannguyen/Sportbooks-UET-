-- Đặt hàng và cập nhật 
START TRANSACTION;
-- Lock bảng products để đảm bảo không ai khác có thể thay đổi dữ liệu trong quá trình này
LOCK TABLES products WRITE;

-- Cập nhật số lượng hàng trong kho hàng
UPDATE products 
SET stock_quantity = stock_quantity - @quantity
WHERE productId = @productId;

-- Tạo bản ghi đơn hàng trong bảng orders
INSERT INTO orders (customerId, productId, quantity, orderDate, shippingAddress)
VALUES (@customerId, @productId, @quantity, NOW(), @shippingAddress);

-- Thực hiện thanh toán và tạo bản ghi trong bảng payments
INSERT INTO payments (orderId, paymentDate, amount, paymentMethod)
VALUES (LAST_INSERT_ID(), NOW(), @totalAmount, @paymentMethod);

UNLOCK TABLES;
COMMIT;



-- Hủy đơn hàng và cập nhật 
START TRANSACTION;

-- Lấy orderId từ thông tin đặt hàng
SELECT orderId INTO @orderId FROM orders WHERE orderId = @orderId;

-- Xóa đơn hàng từ bảng orders
DELETE FROM orders WHERE orderId = @orderId;

-- Xóa thông tin thanh toán từ bảng payments (do chính sách của mình nữa)
DELETE FROM payments WHERE orderId = @orderId;

COMMIT;


-- Giỏ hàng
START TRANSACTION;

-- Thêm sản phẩm vào giỏ hàng
INSERT INTO cart (customerId, productId, quantity)
VALUES (@customerId, @productId, @quantity);

COMMIT;


--
-- Thêm mới hoặc cập nhật đánh giá sản phẩm
START TRANSACTION;

-- Lock bảng reviews để đảm bảo không có xung đột khi thêm hoặc cập nhật đánh giá
SELECT * FROM reviews WHERE productId = @productId FOR UPDATE;

-- Kiểm tra xem người dùng đã đánh giá sản phẩm này chưa
SELECT COUNT(*) AS existing_review
FROM reviews 
WHERE productId = @productId AND customerId = @customerId;

IF existing_review = 0 THEN
  -- Thêm đánh giá mới
  INSERT INTO reviews (productId, customerId, rating, reviewComment, reviewDate, helpfulVotes)
  VALUES (@productId, @customerId, @rating, @reviewComment, NOW(), 0);
ELSE
  -- Cập nhật đánh giá hiện có
  UPDATE reviews 
  SET rating = @rating, reviewComment = @reviewComment, reviewDate = NOW()
  WHERE productId = @productId AND customerId = @customerId;
END IF;

-- Commit transaction sau khi hoàn thành
COMMIT;


-- quản lý cập nhật thông tin sản phẩm

LOCK TABLES products WRITE;

-- Cập nhật thông tin của sản phẩm
UPDATE products 
SET productName = @newProductName, description = @newDescription, price = @newPrice
WHERE productId = @productId;

UNLOCK TABLES;


