-- Sample ads for testing the ad listing system
INSERT INTO ads (id, user_id, category_id, title, description, price, currency, location, condition, images, tags, is_featured, is_active, views_count, favorites_count) VALUES
-- Cars
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', 'Maruti Swift VDI 2018', 'Well maintained Maruti Swift VDI 2018 model. Single owner, all papers clear. AC, power steering, central locking. Excellent condition.', 450000, 'INR', 'Mumbai, Maharashtra', 'Excellent', ARRAY['/placeholder.svg?height=300&width=400'], ARRAY['maruti', 'swift', 'diesel', 'single-owner'], true, true, 245, 12),

('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440011', 'Honda City 2020 Petrol', 'Honda City 2020 model, petrol variant. Driven only 25,000 km. All service records available. Like new condition.', 850000, 'INR', 'Delhi, Delhi', 'Like New', ARRAY['/placeholder.svg?height=300&width=400'], ARRAY['honda', 'city', 'petrol', 'low-mileage'], false, true, 189, 8),

-- Electronics
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440021', 'iPhone 13 128GB Blue', 'iPhone 13 128GB in Blue color. 11 months old, excellent condition. All accessories included. Battery health 95%.', 65000, 'INR', 'Bangalore, Karnataka', 'Excellent', ARRAY['/placeholder.svg?height=300&width=400'], ARRAY['iphone', 'apple', '128gb', 'blue'], true, true, 567, 23),

('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440022', 'Dell Inspiron 15 Laptop', 'Dell Inspiron 15 laptop with Intel i5 processor, 8GB RAM, 512GB SSD. Perfect for office work and studies.', 42000, 'INR', 'Pune, Maharashtra', 'Good', ARRAY['/placeholder.svg?height=300&width=400'], ARRAY['dell', 'laptop', 'i5', '8gb-ram'], false, true, 134, 5),

-- Real Estate
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440016', '2BHK Apartment for Sale', 'Spacious 2BHK apartment in prime location. 1200 sq ft, well ventilated, parking included. Ready to move.', 7500000, 'INR', 'Gurgaon, Haryana', 'New', ARRAY['/placeholder.svg?height=300&width=400'], ARRAY['2bhk', 'apartment', 'parking', 'ready-to-move'], true, true, 89, 15),

-- Motorcycles
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440012', 'Royal Enfield Classic 350', 'Royal Enfield Classic 350, 2019 model. Well maintained, all papers clear. New tyres recently fitted.', 125000, 'INR', 'Chennai, Tamil Nadu', 'Good', ARRAY['/placeholder.svg?height=300&width=400'], ARRAY['royal-enfield', 'classic-350', 'bike'], false, true, 298, 18),

-- Furniture
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440026', 'Wooden Dining Table Set', '6-seater wooden dining table with chairs. Solid wood construction, excellent condition. Moving sale.', 25000, 'INR', 'Hyderabad, Telangana', 'Excellent', ARRAY['/placeholder.svg?height=300&width=400'], ARRAY['dining-table', 'wooden', '6-seater', 'furniture'], false, true, 76, 4),

-- Jobs
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440030', 'Software Developer - React.js', 'Looking for experienced React.js developer. 2-4 years experience required. Work from home option available.', 800000, 'INR', 'Bangalore, Karnataka', 'New', ARRAY[], ARRAY['software', 'react', 'developer', 'wfh'], true, true, 445, 67);

-- Insert sample user profiles
INSERT INTO user_profiles (id, full_name, email, phone, location, bio, is_verified, rating, total_reviews) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Rajesh Kumar', 'rajesh@example.com', '+91-9876543210', 'Mumbai, Maharashtra', 'Car enthusiast and dealer', true, 4.5, 23),
('550e8400-e29b-41d4-a716-446655440002', 'Priya Sharma', 'priya@example.com', '+91-9876543211', 'Delhi, Delhi', 'Selling my personal car', false, 4.2, 8),
('550e8400-e29b-41d4-a716-446655440003', 'Amit Singh', 'amit@example.com', '+91-9876543212', 'Bangalore, Karnataka', 'Tech professional', true, 4.8, 15),
('550e8400-e29b-41d4-a716-446655440004', 'Sneha Patel', 'sneha@example.com', '+91-9876543213', 'Pune, Maharashtra', 'Student selling laptop', false, 4.0, 3),
('550e8400-e29b-41d4-a716-446655440005', 'Vikram Reddy', 'vikram@example.com', '+91-9876543214', 'Gurgaon, Haryana', 'Real estate agent', true, 4.6, 45),
('550e8400-e29b-41d4-a716-446655440006', 'Arjun Nair', 'arjun@example.com', '+91-9876543215', 'Chennai, Tamil Nadu', 'Bike enthusiast', false, 4.3, 12),
('550e8400-e29b-41d4-a716-446655440007', 'Kavya Iyer', 'kavya@example.com', '+91-9876543216', 'Hyderabad, Telangana', 'Moving to new city', false, 4.1, 6),
('550e8400-e29b-41d4-a716-446655440008', 'Tech Solutions Pvt Ltd', 'hr@techsolutions.com', '+91-9876543217', 'Bangalore, Karnataka', 'Leading IT company', true, 4.7, 89);
