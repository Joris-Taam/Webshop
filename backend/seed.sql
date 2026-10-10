-- Seed data for 3webshop - 3D Model Webshop
-- This file contains initial data for development purposes

USE `3webshop`;

-- Disable foreign key checks temporarily for easier insertion
SET FOREIGN_KEY_CHECKS=0;

-- -----------------------------------------------------
-- Insert Roles
-- -----------------------------------------------------
INSERT INTO `3webshop`.`Roles` (`title`, `description`) VALUES
('Admin', 'Administrator with full access to manage products, orders, and promotions'),
('Customer', 'Regular customer who can purchase 3D models');

-- -----------------------------------------------------
-- Insert Categories
-- -----------------------------------------------------
INSERT INTO `3webshop`.`Categories` (`name`, `description`, `imgPath`) VALUES
('Characters', '3D character models including humans, animals, and fantasy creatures', '/uploads/img/categories/characters.jpg'),
('Vehicles', '3D vehicle models including cars, trucks, motorcycles, and aircraft', '/uploads/img/categories/vehicles.jpg'),
('Buildings', '3D building models including houses, skyscrapers, and architectural structures', '/uploads/img/categories/buildings.jpg'),
('Furniture', '3D furniture models including chairs, tables, sofas, and decorative items', '/uploads/img/categories/furniture.jpg'),
('Props', '3D prop models including weapons, tools, and miscellaneous objects', '/uploads/img/categories/props.jpg'),
('Nature', '3D nature models including trees, plants, rocks, and terrain', '/uploads/img/categories/nature.jpg'),
('Electronics', '3D electronic device models including phones, computers, and gadgets', '/uploads/img/categories/electronics.jpg'),
('Weapons', '3D weapon models including swords, guns, and fantasy weapons', '/uploads/img/categories/weapons.jpg');

-- -----------------------------------------------------
-- Insert Shopping Carts (must exist before Users)
-- -----------------------------------------------------
INSERT INTO `3webshop`.`Shoppingcarts` (`userEmail`) VALUES
('admin@bugwriters.com'),
('john.doe@example.com'),
('jane.smith@example.com'),
('alice.johnson@example.com'),
('bob.williams@example.com');

-- -----------------------------------------------------
-- Insert Wishlists (must exist before Users)
-- -----------------------------------------------------
INSERT INTO `3webshop`.`Wishlists` (`UserEmail`) VALUES
('admin@bugwriters.com'),
('john.doe@example.com'),
('jane.smith@example.com'),
('alice.johnson@example.com'),
('bob.williams@example.com');

-- -----------------------------------------------------
-- Insert Users
-- -----------------------------------------------------
INSERT INTO `3webshop`.`Users` (`email`, `password`, `firstname`, `infix`, `lastname`, `roleTitle`) VALUES
('admin@bugwriters.com', '$2b$10$hashedpassword1', 'Admin', NULL, 'User', 'Admin'),
('john.doe@example.com', '$2b$10$hashedpassword2', 'John', NULL, 'Doe', 'Customer'),
('jane.smith@example.com', '$2b$10$hashedpassword3', 'Jane', NULL, 'Smith', 'Customer'),
('alice.johnson@example.com', '$2b$10$hashedpassword4', 'Alice', 'Marie', 'Johnson', 'Customer'),
('bob.williams@example.com', '$2b$10$hashedpassword5', 'Bob', NULL, 'Williams', 'Customer');

-- -----------------------------------------------------
-- Insert Products (3D Models)
-- -----------------------------------------------------
INSERT INTO `3webshop`.`Products` (`name`, `description`, `price`, `sizeWidth`, `sizeHeight`, `sizeLength`, `category`, `fileExtension`, `filePath`, `imgPath`) VALUES
-- Characters
('Medieval Knight', 'Detailed medieval knight character with armor and sword. Includes multiple texture maps.', 29.99, 1.8, 2.1, 0.8, 'Characters', 'fbx', '/uploads/files/knight.fbx', '/uploads/img/knight.jpg'),
('Sci-Fi Robot', 'Futuristic robot character with modular parts. High poly count for detailed renders.', 34.99, 1.5, 2.0, 0.7, 'Characters', 'obj', '/uploads/files/robot.obj', '/uploads/img/robot.jpg'),
('Fantasy Elf', 'Elegant fantasy elf character with detailed clothing and accessories.', 27.99, 1.6, 1.9, 0.6, 'Characters', 'fbx', '/uploads/files/elf.fbx', '/uploads/img/elf.jpg'),
('Cartoon Cat', 'Cute cartoon cat character perfect for games and animations.', 19.99, 0.8, 1.0, 0.5, 'Characters', 'blend', '/uploads/files/cat.blend', '/uploads/img/cat.jpg'),

-- Vehicles
('Sports Car', 'High-detail sports car model with interior. Perfect for racing games.', 49.99, 4.5, 1.3, 1.8, 'Vehicles', 'fbx', '/uploads/files/sportscar.fbx', '/uploads/img/sportscar.jpg'),
('Motorcycle', 'Realistic motorcycle model with detailed engine and textures.', 39.99, 2.1, 1.2, 0.9, 'Vehicles', 'obj', '/uploads/files/motorcycle.obj', '/uploads/img/motorcycle.jpg'),
('Fighter Jet', 'Military fighter jet with high detail exterior and cockpit.', 59.99, 15.0, 3.5, 4.2, 'Vehicles', 'fbx', '/uploads/files/jet.fbx', '/uploads/img/jet.jpg'),
('Truck', 'Heavy-duty truck model with cargo area. Includes multiple color variants.', 44.99, 6.0, 2.8, 2.2, 'Vehicles', 'fbx', '/uploads/files/truck.fbx', '/uploads/img/truck.jpg'),

-- Buildings
('Modern House', 'Complete modern house model with interior rooms and furniture.', 79.99, 12.0, 6.0, 10.0, 'Buildings', 'obj', '/uploads/files/house.obj', '/uploads/img/house.jpg'),
('Skyscraper', 'Detailed skyscraper model perfect for city scenes.', 89.99, 20.0, 80.0, 20.0, 'Buildings', 'fbx', '/uploads/files/skyscraper.fbx', '/uploads/img/skyscraper.jpg'),
('Medieval Castle', 'Complete medieval castle with towers and walls.', 99.99, 30.0, 15.0, 30.0, 'Buildings', 'obj', '/uploads/files/castle.obj', '/uploads/img/castle.jpg'),

-- Furniture
('Modern Sofa', 'Comfortable modern sofa with detailed fabric textures.', 24.99, 2.2, 0.9, 0.9, 'Furniture', 'fbx', '/uploads/files/sofa.fbx', '/uploads/img/sofa.jpg'),
('Wooden Table', 'Elegant wooden dining table with realistic wood grain.', 19.99, 1.8, 0.75, 0.9, 'Furniture', 'obj', '/uploads/files/table.obj', '/uploads/img/table.jpg'),
('Office Chair', 'Ergonomic office chair with adjustable features.', 22.99, 0.6, 1.2, 0.6, 'Furniture', 'fbx', '/uploads/files/chair.fbx', '/uploads/img/chair.jpg'),
('Bookshelf', 'Tall wooden bookshelf with multiple shelves.', 18.99, 0.4, 2.0, 1.0, 'Furniture', 'obj', '/uploads/files/bookshelf.obj', '/uploads/img/bookshelf.jpg'),

-- Props
('Sword', 'Medieval sword with detailed hilt and blade textures.', 12.99, 0.1, 1.2, 0.05, 'Props', 'fbx', '/uploads/files/sword.fbx', '/uploads/img/sword.jpg'),
('Treasure Chest', 'Ornate treasure chest with lock and detailed woodwork.', 15.99, 0.8, 0.6, 0.5, 'Props', 'obj', '/uploads/files/chest.obj', '/uploads/img/chest.jpg'),
('Magic Staff', 'Fantasy magic staff with glowing crystal orb.', 14.99, 0.1, 1.5, 0.1, 'Props', 'fbx', '/uploads/files/staff.fbx', '/uploads/img/staff.jpg'),

-- Nature
('Oak Tree', 'Realistic oak tree with detailed bark and leaves.', 16.99, 3.0, 8.0, 3.0, 'Nature', 'obj', '/uploads/files/oaktree.obj', '/uploads/img/oaktree.jpg'),
('Rock Formation', 'Natural rock formation with realistic textures.', 9.99, 2.0, 1.5, 1.8, 'Nature', 'fbx', '/uploads/files/rocks.fbx', '/uploads/img/rocks.jpg'),
('Flower Bouquet', 'Beautiful flower bouquet with multiple flower types.', 11.99, 0.3, 0.5, 0.3, 'Nature', 'obj', '/uploads/files/flowers.obj', '/uploads/img/flowers.jpg'),

-- Electronics
('Smartphone', 'Modern smartphone model with screen and buttons.', 13.99, 0.07, 0.15, 0.01, 'Electronics', 'fbx', '/uploads/files/phone.fbx', '/uploads/img/phone.jpg'),
('Laptop', 'Laptop computer model with open/close animation.', 17.99, 0.35, 0.25, 0.03, 'Electronics', 'obj', '/uploads/files/laptop.obj', '/uploads/img/laptop.jpg'),
('Gaming Console', 'Gaming console with controller accessories.', 19.99, 0.3, 0.08, 0.25, 'Electronics', 'fbx', '/uploads/files/console.fbx', '/uploads/img/console.jpg'),

-- Weapons
('Laser Rifle', 'Futuristic laser rifle with glowing energy effects.', 21.99, 0.15, 0.9, 0.1, 'Weapons', 'fbx', '/uploads/files/laserrifle.fbx', '/uploads/img/laserrifle.jpg'),
('Battle Axe', 'Heavy battle axe with detailed metalwork.', 16.99, 0.8, 0.1, 0.05, 'Weapons', 'obj', '/uploads/files/axe.obj', '/uploads/img/axe.jpg'),
('Crossbow', 'Medieval crossbow with bolts and detailed mechanism.', 18.99, 0.9, 0.3, 0.1, 'Weapons', 'fbx', '/uploads/files/crossbow.fbx', '/uploads/img/crossbow.jpg');

-- -----------------------------------------------------
-- Insert Promotions
-- -----------------------------------------------------
INSERT INTO `3webshop`.`Promotions` (`title`, `description`, `percentage`) VALUES
('Summer Sale', 'Summer sale on all 3D models', 20.0),
('Character Pack', 'Special discount on character models', 15.0),
('New User Discount', 'Welcome discount for new customers', 10.0),
('Holiday Special', 'Holiday season special promotion', 25.0);

-- -----------------------------------------------------
-- Insert Orders
-- -----------------------------------------------------
INSERT INTO `3webshop`.`Orders` (`total`, `createdAt`, `userEmail`, `status`) VALUES
(49.99, '2024-01-15 10:30:00', 'john.doe@example.com', 'Completed'),
(89.97, '2024-01-20 14:22:00', 'jane.smith@example.com', 'Pending'),
(34.99, '2024-01-25 09:15:00', 'alice.johnson@example.com', 'Completed'),
(127.97, '2024-02-01 16:45:00', 'john.doe@example.com', 'Shipped'),
(59.99, '2024-02-05 11:20:00', 'bob.williams@example.com', 'Pending');

-- -----------------------------------------------------
-- Insert OrderProducts
-- -----------------------------------------------------
INSERT INTO `3webshop`.`OrderProducts` (`orderUserEmail`, `orderCreatedAt`, `productName`, `productCategory`) VALUES
('john.doe@example.com', '2024-01-15 10:30:00', 'Sports Car', 'Vehicles'),
('jane.smith@example.com', '2024-01-20 14:22:00', 'Medieval Knight', 'Characters'),
('jane.smith@example.com', '2024-01-20 14:22:00', 'Sword', 'Props'),
('jane.smith@example.com', '2024-01-20 14:22:00', 'Treasure Chest', 'Props'),
('alice.johnson@example.com', '2024-01-25 09:15:00', 'Sci-Fi Robot', 'Characters'),
('john.doe@example.com', '2024-02-01 16:45:00', 'Modern House', 'Buildings'),
('john.doe@example.com', '2024-02-01 16:45:00', 'Modern Sofa', 'Furniture'),
('john.doe@example.com', '2024-02-01 16:45:00', 'Wooden Table', 'Furniture'),
('bob.williams@example.com', '2024-02-05 11:20:00', 'Fighter Jet', 'Vehicles');

-- -----------------------------------------------------
-- Insert Reviews
-- -----------------------------------------------------
INSERT INTO `3webshop`.`Reviews` (`userEmail`, `productName`, `productCategory`, `review`) VALUES
('john.doe@example.com', 'Sports Car', 'Vehicles', 'Excellent quality model! The textures are very detailed and the model works perfectly in my game engine. Highly recommended!'),
('jane.smith@example.com', 'Medieval Knight', 'Characters', 'Great character model with amazing detail. The armor looks realistic and the rigging is well done.'),
('alice.johnson@example.com', 'Sci-Fi Robot', 'Characters', 'Perfect for my sci-fi project. The modular parts are a nice touch.'),
('john.doe@example.com', 'Modern House', 'Buildings', 'Very detailed house model. The interior is well designed. Worth every penny!'),
('bob.williams@example.com', 'Fighter Jet', 'Vehicles', 'Amazing detail on this jet model. The cockpit interior is especially impressive.');

-- -----------------------------------------------------
-- Insert ShoppingcartProducts
-- -----------------------------------------------------
INSERT INTO `3webshop`.`ShoppingcartProducts` (`productName`, `productCategory`, `shoppingCartUserEmail`, `createdAt`) VALUES
('Fantasy Elf', 'Characters', 'john.doe@example.com', '2024-02-10 08:00:00'),
('Motorcycle', 'Vehicles', 'john.doe@example.com', '2024-02-10 08:05:00'),
('Office Chair', 'Furniture', 'jane.smith@example.com', '2024-02-08 12:30:00'),
('Laser Rifle', 'Weapons', 'alice.johnson@example.com', '2024-02-09 15:20:00'),
('Oak Tree', 'Nature', 'bob.williams@example.com', '2024-02-07 10:15:00');

-- -----------------------------------------------------
-- Insert WishlistProducts
-- -----------------------------------------------------
INSERT INTO `3webshop`.`WishlistProducts` (`productName`, `productCategory`, `wishlistUserEmail`, `createdAt`) VALUES
('Skyscraper', 'Buildings', 'john.doe@example.com', '2024-01-28 09:00:00'),
('Medieval Castle', 'Buildings', 'john.doe@example.com', '2024-01-28 09:05:00'),
('Truck', 'Vehicles', 'jane.smith@example.com', '2024-02-01 11:00:00'),
('Gaming Console', 'Electronics', 'alice.johnson@example.com', '2024-02-03 14:00:00'),
('Battle Axe', 'Weapons', 'bob.williams@example.com', '2024-02-05 16:00:00'),
('Cartoon Cat', 'Characters', 'bob.williams@example.com', '2024-02-05 16:05:00');

-- -----------------------------------------------------
-- Insert PromotionProducts
-- -----------------------------------------------------
INSERT INTO `3webshop`.`PromotionProducts` (`productName`, `productCategory`, `promotionTitle`, `startingDate`, `endingDate`) VALUES
('Medieval Knight', 'Characters', 'Character Pack', '2024-02-01', '2024-02-29'),
('Sci-Fi Robot', 'Characters', 'Character Pack', '2024-02-01', '2024-02-29'),
('Fantasy Elf', 'Characters', 'Character Pack', '2024-02-01', '2024-02-29'),
('Cartoon Cat', 'Characters', 'Character Pack', '2024-02-01', '2024-02-29'),
('Sports Car', 'Vehicles', 'Summer Sale', '2024-06-01', '2024-08-31'),
('Motorcycle', 'Vehicles', 'Summer Sale', '2024-06-01', '2024-08-31'),
('Modern Sofa', 'Furniture', 'Summer Sale', '2024-06-01', '2024-08-31'),
('Wooden Table', 'Furniture', 'Summer Sale', '2024-06-01', '2024-08-31');

-- -----------------------------------------------------
-- Insert PromotionCategories
-- -----------------------------------------------------
INSERT INTO `3webshop`.`PromotionCategories` (`categoryName`, `promotionTitle`, `startingDate`, `endingDate`) VALUES
('Weapons', 'Holiday Special', '2024-12-01', '2024-12-31'),
('Props', 'Holiday Special', '2024-12-01', '2024-12-31'),
('Nature', 'New User Discount', '2024-01-01', '2024-12-31'),
('Electronics', 'New User Discount', '2024-01-01', '2024-12-31');

-- -----------------------------------------------------
-- Insert ContactRequests
-- -----------------------------------------------------
INSERT INTO `3webshop`.`ContactRequests` (`name`, `email`, `subject`, `createdAt`, `message`, `status`, `note`) VALUES
('John Doe', 'john.doe@example.com', 'Question about product format', '2024-01-10 14:30:00', 'Hello, I would like to know if the 3D models come in multiple formats or just one? I need OBJ format specifically.', 'completed', 'Responded: All products include multiple format options'),
('Jane Smith', 'jane.smith@example.com', 'Technical support needed', '2024-02-12 09:15:00', 'I purchased a model but cannot download it. The download link seems to be broken. Please help!', 'inProgress', 'Checking download system'),
('Alice Johnson', 'alice.johnson@example.com', 'Bulk purchase inquiry', '2024-02-15 16:45:00', 'I am interested in purchasing multiple character models for a game project. Do you offer bulk discounts?', 'new', NULL),
('Bob Williams', 'bob.williams@example.com', 'Custom model request', '2024-02-18 11:20:00', 'I need a custom 3D model created. Do you offer custom modeling services?', 'new', NULL),
('Sarah Brown', 'sarah.brown@example.com', 'Refund request', '2024-02-20 13:00:00', 'I accidentally purchased the wrong model. Can I get a refund?', 'inProgress', 'Processing refund request');

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS=1;

