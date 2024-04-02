INSERT INTO `db`.`categories` (`catId`, `catName`) VALUES ('1', 'Shirt');
INSERT INTO `db`.`categories` (`catId`, `catName`) VALUES ('2', 'Armband');
INSERT INTO `db`.`products` (`productId`, `productName`, `description`, `price`, `stock_quantity`) VALUES ('1', 'Ronaldo\'s armband', '2', 'Ronaldo thrown armband after his team lost ', '1000.00', '1888', NULL
);
INSERT INTO `db`.`products` (`productId`, `productName`, `description`, `price`, `stock_quantity`) VALUES ('2', 'Ronaldo\'s shirt', '1', 'Ronaldo\'s 7 shirt', '1000.00', '177', NULL
);
INSERT INTO `db`.`history` (`historyId`, `customerId`, `productId`, `quantity`, `purchaseDate`) VALUES ('1', '1', '1', '100', '2024-04-04'
);
INSERT INTO `db`.`history` (`historyId`, `customerId`, `productId`, `quantity`, `purchaseDate`) VALUES ('2', '1', '2', '200', '2023-12-31'
);

/*Lấy mặt hàng bán chạy nhất*/
DELIMITER $$

CREATE PROCEDURE getBestSaleProduct()
BEGIN

SELECT* 
FROM products
WhERE productID = (
SELECT productID
FROM history H
GROUP BY productID
HAVING SUM(quantity) = (
    SELECT MAX(TotalNumber) AS M_Value
    FROM (
        SELECT SUM(quantity) AS TotalNumber, productId
        FROM history
        GROUP BY productID
    ) AS temp
)
);
END$$

CALL getBestSaleProduct();
$$
INSERT INTO `db`.`cart` (`cartId`, `customerId`, `productId`, `quantity`) VALUES ('1', '1', '1', '100');
INSERT INTO `db`.`cart` (`cartId`, `customerId`, `productId`, `quantity`) VALUES ('2', '2', '2', '200');
$$
/*Lấy danh sách các giỏ*/
SELECT * FROM CART;

/*Lấy danh sách các sản phẩm thuộc về 1 giỏ*/

/*Vấn đề: 1 giỏ hàng có thể có nhiều hơn 1 món hàng*/

