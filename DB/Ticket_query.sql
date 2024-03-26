USE DB;
/*1. Lấy tất cả vé cho 1 sự kiện*/
DELIMITER $$
CREATE PROCEDURE getAllTicketsForEvent(IN ev_Name VARCHAR(255), IN ev_ID INT)
BEGIN
SELECT* FROM tickets TI
INNER JOIN trips TR ON TI.ticketID = TR.eventID
WHERE TI.eventName LIKE CONCAT('%', ev_Name, '%') or TR.eventID = ev_ID;
END$$
DELIMITER;
;

/*2. Lấy thông tin về 1 vé cụ thể*/
DELIMITER $$
CREATE PROCEDURE getTicketById( IN id INT)
BEGIN
SELECT* FROM tickets
WHERE ticketID = id;
END$$

CALL getTicketbyID(1);$$
CALL getAllTicketsForEvent('FA',NULL);
