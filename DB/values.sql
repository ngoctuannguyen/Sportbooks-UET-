-- -- Insert default data into users table
-- INSERT INTO users (username, password, email, role, customerId) VALUES 
--     ('admin', 'adminpassword', 'admin@example.com', 'admin', 0),
--     ('user', 'userpassword', 'user@example.com', 'user', 0);

-- Insert default data into categories table
INSERT INTO categories (catName) VALUES 
    ('Electronics'),
    ('Clothing');

-- Insert default data into products table
INSERT INTO products (productName, catId, description, price, stock_quantity, productImage) VALUES 
    ('Smartphone', 1, 'High-end smartphone', 999.99, 100, 'smartphone.jpg'),
    ('T-shirt', 2, 'Casual T-shirt', 19.99, 200, 'tshirt.jpg');

-- Insert default data into customers table
INSERT INTO customers (customerName, email, address, phone) VALUES 
    ('John Doe', 'john@example.com', '123 Main St, City', '123-456-7890'),
    ('Jane Smith', 'jane@example.com', '456 Elm St, Town', '987-654-3210');

-- Insert default data into orders table
INSERT INTO orders (customerId, productId, quantity, orderDate, shippingAddress) VALUES 
    (1, 1, 2, '2024-03-19', '123 Main St, City'),
    (2, 2, 1, '2024-03-20', '456 Elm St, Town');

-- Insert default data into reviews table
INSERT INTO reviews (productId, customerId, rating, reviewComment, reviewDate, helpfulVotes) VALUES 
    (1, 1, 5, 'Great smartphone!', '2024-03-21', 10),
    (2, 2, 4, 'Nice T-shirt!', '2024-03-22', 8);

-- Insert default data into history table
INSERT INTO history (customerId, productId, quantity, purchaseDate) VALUES 
    (1, 1, 2, '2024-03-19'),
    (2, 2, 1, '2024-03-20');

-- Insert default data into tickets table
INSERT INTO tickets (eventName, eventDate, venue, ticketPrice) VALUES 
    ('Tech Conference', '2024-04-01', 'Convention Center', 99.99),
    ('Music Festival', '2024-05-15', 'Outdoor Stadium', 49.99);

-- Insert default data into trips table
INSERT INTO trips (customerId, eventId, departureDate, returnDate, eventDescription, destination) VALUES 
    (1, 1, '2024-04-01', '2024-04-03', 'Annual tech conference', 'City A'),
    (2, 2, '2024-05-15', '2024-05-17', 'Summer music festival', 'City B');

-- Insert default data into cart table
INSERT INTO cart (customerId, productId, quantity) VALUES 
    (1, 1, 1),
    (2, 2, 2);

-- Insert default data into payments table
INSERT INTO payments (orderId, paymentDate, amount, paymentMethod) VALUES 
    (1, '2024-03-19', 199.98, 'Credit Card'),
    (2, '2024-03-20', 89.97, 'PayPal');
