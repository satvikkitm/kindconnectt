/*
  # Add Initial Rewards

  1. Initial Data
    - Add sample rewards for testing
    - Set reasonable token costs
    - Include stock quantities
*/

INSERT INTO rewards (name, description, image_url, token_cost, available_quantity)
VALUES
  (
    'Premium Donation Badge',
    'A special badge to showcase your generous contributions',
    'https://images.unsplash.com/photo-1562051036-e0eea191d42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    100,
    50
  ),
  (
    'Featured Donor Status',
    'Get featured on our homepage as a top donor for one week',
    'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    250,
    10
  ),
  (
    'Charity Choice Award',
    'Choose a charity to receive a $50 donation in your name',
    'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    500,
    5
  ),
  (
    'Virtual Volunteer Training',
    'Access to premium volunteer training courses',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    150,
    20
  ),
  (
    'NGO Partnership Certificate',
    'Official certificate recognizing your partnership with our NGOs',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    300,
    15
  ),
  (
    'Impact Report Feature',
    'Get featured in our monthly impact report',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    200,
    25
  );