use db;

/*1. Lấy tất cả sự kiện*/
DELIMITER $$
CREATE PROCEDURE getAllTrips()
BEGIN
SELECT* FROM TripS;
END$$
DELIMITER;
;

-- Này không cần thiết lắm đâu -)))

/*2. Lấy thông tin về 1 sk cụ thể*/
DELIMITER $$
CREATE PROCEDURE getTripById( IN id INT)
BEGIN
SELECT* FROM TRIPS
WHERE tripID = id;
END$$
DELIMITER;
;

/*3. Lấy thông tin về sk theo tên, ngày, địa điểm,...*/
DELIMITER $$
CREATE PROCEDURE getTripByInfos( IN eName VARCHAR(255),IN departDate date, IN reDate date, IN dest VARCHAR(60))
BEGIN
SELECT* FROM TRIPS TR
INNER JOIN TICKETS TI ON TI.ticketID = TR.eventID
WHERE TR.departureDate = departDate or TR.returnDate = reDate or TR.destination = dest or TI.eventName=eName; 
END$$
DELIMITER;
;
/*4. Lấy theo sự kiện, giá vé*/
DELIMITER $$
CREATE PROCEDURE getTripByInfos2( IN ev_ID INT,IN price INT)
BEGIN
SELECT* FROM TRIPS TR
INNER JOIN TICKETS TI ON TI.ticketID = TR.eventID
WHERE TR.eventID = ev_ID OR TI.ticketPrice = price;
END$$

/*5. Thêm sự kiện*/
INSERT INTO customers (customerName, email, address, phone)
VALUES ('John', 'john@example.com', 'hai ba trung', '1234567890');$$
INSERT INTO customers (customerName, email, address, phone)
VALUES ('Cena', 'cena@example.com', 'ba trieu', '0112223445');$$
INSERT INTO tickets VALUES (1,"Champion League Final",'2024-3-12','Wembley',500);$$
INSERT INTO trips VALUES (1,1,1,'2024-3-10','2024-3-14',"Chelsea vs Arsenal","USA");$$

CALL getALLtrips();$$
CALL gettripbyID(1);

