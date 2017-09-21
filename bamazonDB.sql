DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products1(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products1 (product_name, department_name, price, stock_quantity)
VALUES("Laptop", "Computers", 1000, 35),("Desktops", "Computers", 1100, 25),("Monitors", "Computers", 750, 25), ("Digital SLRs", "Camera, Photo & Video", 1500, 15),("lenses", "Camera, Photo & Video", 500, 18),("Photography Drones", "Camera, Photo & Video", 100, 25), ("Blu-ray Movies", "Movies & TV", 20, 150),("DVD", "Movies & TV", 20, 110),("Laser Printers", "Printers", 200, 17), ("Multi-Function Printers", "Printers", 300, 27);

SELECT * FROM products1;