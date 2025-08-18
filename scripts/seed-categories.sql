-- Seed script for Indian classifieds categories
-- This script creates 30+ categories relevant to the Indian market

INSERT INTO categories (id, name, slug, description, icon, parent_id) VALUES
-- Main Categories
('550e8400-e29b-41d4-a716-446655440001', 'Vehicles', 'vehicles', 'Cars, bikes, commercial vehicles and auto parts', '🚗', NULL),
('550e8400-e29b-41d4-a716-446655440002', 'Real Estate', 'real-estate', 'Properties for sale and rent', '🏠', NULL),
('550e8400-e29b-41d4-a716-446655440003', 'Electronics', 'electronics', 'Mobile phones, computers, TVs and gadgets', '📱', NULL),
('550e8400-e29b-41d4-a716-446655440004', 'Home & Lifestyle', 'home-lifestyle', 'Furniture, home decor and appliances', '🏡', NULL),
('550e8400-e29b-41d4-a716-446655440005', 'Jobs', 'jobs', 'Job opportunities and career listings', '💼', NULL),
('550e8400-e29b-41d4-a716-446655440006', 'Services', 'services', 'Professional and personal services', '🔧', NULL),
('550e8400-e29b-41d4-a716-446655440007', 'Fashion', 'fashion', 'Clothing, accessories and footwear', '👗', NULL),
('550e8400-e29b-41d4-a716-446655440008', 'Education', 'education', 'Courses, books and educational services', '📚', NULL),
('550e8400-e29b-41d4-a716-446655440009', 'Sports & Fitness', 'sports-fitness', 'Sports equipment and fitness gear', '⚽', NULL),
('550e8400-e29b-41d4-a716-446655440010', 'Pets', 'pets', 'Pet animals and pet care products', '🐕', NULL),

-- Vehicle Subcategories
('550e8400-e29b-41d4-a716-446655440011', 'Cars', 'cars', 'Used and new cars for sale', '🚙', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440012', 'Motorcycles', 'motorcycles', 'Bikes and scooters', '🏍️', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440013', 'Commercial Vehicles', 'commercial-vehicles', 'Trucks, buses and commercial vehicles', '🚛', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440014', 'Auto Parts', 'auto-parts', 'Spare parts and accessories', '🔧', '550e8400-e29b-41d4-a716-446655440001'),

-- Real Estate Subcategories
('550e8400-e29b-41d4-a716-446655440015', 'Houses for Sale', 'houses-sale', 'Independent houses and villas', '🏘️', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440016', 'Apartments for Sale', 'apartments-sale', 'Flats and apartments for sale', '🏢', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440017', 'Houses for Rent', 'houses-rent', 'Houses and villas for rent', '🏠', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440018', 'Apartments for Rent', 'apartments-rent', 'Flats for rent', '🏬', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440019', 'Commercial Property', 'commercial-property', 'Offices, shops and commercial spaces', '🏪', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440020', 'Land & Plots', 'land-plots', 'Agricultural and residential plots', '🌾', '550e8400-e29b-41d4-a716-446655440002'),

-- Electronics Subcategories
('550e8400-e29b-41d4-a716-446655440021', 'Mobile Phones', 'mobile-phones', 'Smartphones and feature phones', '📱', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440022', 'Computers & Laptops', 'computers-laptops', 'Desktop computers and laptops', '💻', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440023', 'TVs & Entertainment', 'tvs-entertainment', 'Televisions and entertainment systems', '📺', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440024', 'Cameras', 'cameras', 'Digital cameras and accessories', '📷', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440025', 'Gaming', 'gaming', 'Gaming consoles and accessories', '🎮', '550e8400-e29b-41d4-a716-446655440003'),

-- Home & Lifestyle Subcategories
('550e8400-e29b-41d4-a716-446655440026', 'Furniture', 'furniture', 'Home and office furniture', '🪑', '550e8400-e29b-41d4-a716-446655440004'),
('550e8400-e29b-41d4-a716-446655440027', 'Home Appliances', 'home-appliances', 'Kitchen and home appliances', '🔌', '550e8400-e29b-41d4-a716-446655440004'),
('550e8400-e29b-41d4-a716-446655440028', 'Home Decor', 'home-decor', 'Decorative items and accessories', '🖼️', '550e8400-e29b-41d4-a716-446655440004'),
('550e8400-e29b-41d4-a716-446655440029', 'Kitchen & Dining', 'kitchen-dining', 'Kitchen utensils and dining items', '🍽️', '550e8400-e29b-41d4-a716-446655440004'),

-- Job Categories
('550e8400-e29b-41d4-a716-446655440030', 'IT Jobs', 'it-jobs', 'Software and IT related jobs', '💻', '550e8400-e29b-41d4-a716-446655440005'),
('550e8400-e29b-41d4-a716-446655440031', 'Sales & Marketing', 'sales-marketing', 'Sales and marketing positions', '📈', '550e8400-e29b-41d4-a716-446655440005'),
('550e8400-e29b-41d4-a716-446655440032', 'Part Time Jobs', 'part-time-jobs', 'Part time and freelance work', '⏰', '550e8400-e29b-41d4-a716-446655440005'),
('550e8400-e29b-41d4-a716-446655440033', 'Government Jobs', 'government-jobs', 'Government sector opportunities', '🏛️', '550e8400-e29b-41d4-a716-446655440005'),

-- Additional Categories
('550e8400-e29b-41d4-a716-446655440034', 'Books & Magazines', 'books-magazines', 'Books, magazines and study materials', '📖', '550e8400-e29b-41d4-a716-446655440008'),
('550e8400-e29b-41d4-a716-446655440035', 'Musical Instruments', 'musical-instruments', 'Guitars, keyboards and other instruments', '🎸', NULL),
('550e8400-e29b-41d4-a716-446655440036', 'Baby & Kids', 'baby-kids', 'Baby products and kids items', '👶', NULL),
('550e8400-e29b-41d4-a716-446655440037', 'Health & Beauty', 'health-beauty', 'Health and beauty products', '💄', NULL),
('550e8400-e29b-41d4-a716-446655440038', 'Travel & Tourism', 'travel-tourism', 'Travel packages and tourism services', '✈️', '550e8400-e29b-41d4-a716-446655440006'),
('550e8400-e29b-41d4-a716-446655440039', 'Wedding Services', 'wedding-services', 'Wedding planning and related services', '💒', '550e8400-e29b-41d4-a716-446655440006'),
('550e8400-e29b-41d4-a716-446655440040', 'Food & Restaurants', 'food-restaurants', 'Food delivery and restaurant services', '🍕', '550e8400-e29b-41d4-a716-446655440006');
