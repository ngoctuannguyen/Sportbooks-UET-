-- Create users table
CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(45) NOT NULL,
    email VARCHAR(60) UNIQUE,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    customerId INT,
    FOREIGN KEY (customerId) REFERENCES customers(customerId)
);
-- Create product categories table
CREATE TABLE categories (
    catId INT AUTO_INCREMENT PRIMARY KEY,
    catName VARCHAR(120) NOT NULL
);

-- Create products table
CREATE TABLE products (
    productId INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(120) NOT NULL,
    catId INT,
    description TEXT,
    price DECIMAL(10, 2),
    stock_quantity INT,
    productImage VARCHAR(255),
    FOREIGN KEY (catId) REFERENCES categories(catId)
);

-- Create customers table
CREATE TABLE customers (
    customerId INT AUTO_INCREMENT PRIMARY KEY,
    customerName VARCHAR(60) NOT NULL,
    email VARCHAR(60),
    address TEXT,
    phone VARCHAR(15)
);

-- Create orders table
CREATE TABLE orders (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    customerId INT,
    productId INT,
    quantity INT,
    orderDate DATE,
    shippingAddress TEXT,
    FOREIGN KEY (customerId) REFERENCES customers(customerId),
    FOREIGN KEY (productId) REFERENCES products(productId)
);

-- Create product reviews table
CREATE TABLE reviews (
    reviewId INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    customerId INT,
    rating INT,
    reviewComment TEXT,
    reviewDate DATE,
    helpfulVotes INT,
    FOREIGN KEY (productId) REFERENCES products(productId),
    FOREIGN KEY (customerId) REFERENCES customers(customerId)
);

-- Create purchase history table
CREATE TABLE history (
    historyId INT AUTO_INCREMENT PRIMARY KEY,
    customerId INT,
    productId INT,
    quantity INT,
    purchaseDate DATE,
    FOREIGN KEY (customerId) REFERENCES customers(customerId),
    FOREIGN KEY (productId) REFERENCES products(productId)
);

-- Create event tickets table
CREATE TABLE tickets (
    ticketId INT AUTO_INCREMENT PRIMARY KEY,
    eventName VARCHAR(255) NOT NULL,
    eventDate DATE,
    venue VARCHAR(50),
    ticketPrice DECIMAL(10, 2)
);

-- Create event trips table
CREATE TABLE trips (
    tripId INT AUTO_INCREMENT PRIMARY KEY,
    customerId INT,
    eventId INT,
    departureDate DATE,
    returnDate DATE,
    eventDescription TEXT,
    destination VARCHAR(60),
    FOREIGN KEY (customerId) REFERENCES customers(customerId),
    FOREIGN KEY (eventId) REFERENCES tickets(ticketId)
);

-- Create shopping cart table
CREATE TABLE cart (
    cartId INT AUTO_INCREMENT PRIMARY KEY,
    customerId INT,
    productId INT,
    quantity INT,
    FOREIGN KEY (customerId) REFERENCES customers(customerId),
    FOREIGN KEY (productId) REFERENCES products(productId)
);

CREATE TABLE payments (
    paymentId INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT,
    paymentDate DATE,
    amount DECIMAL(10, 2),
    paymentMethod VARCHAR(50),
    FOREIGN KEY (orderId) REFERENCES orders(orderId)
);
