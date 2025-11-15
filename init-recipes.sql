
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS recipe_app;
USE recipe_app;

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  difficulty VARCHAR(20),
  cookTime VARCHAR(20),
  servings INT,
  ingredients TEXT,
  instructions TEXT
);

-- Insert recipe data
INSERT INTO recipes (id, title, description, category, difficulty, cookTime, servings, ingredients, instructions) VALUES
(1, 'Spaghetti Carbonara TEST', 'Classic Italian pasta dish with eggs, cheese, and pancetta', 'Italian', 'Medium', '20', 4, '[]', ''),
(2, 'Chocolate Chip Cookies', 'Soft and chewy homemade chocolate chip cookies', 'Dessert', 'Easy', '25', 36, '[]', ''),
(3, 'Grilled Chicken Salad', 'Healthy grilled chicken salad with mixed greens and vinaigrette', 'Main Course', 'Easy', '30', 2, '[]', ''),
(4, 'Butter Chicken ', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, ', 'Appetizer', 'Hard', '45', 11, '[
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Aliquam ullamcorper felis eget nisi bibendum egestas.",
  "Proin ultrices enim id maximus imperdiet.",
  "Donec aliquet sem sit amet magna efficitur, id accumsan ante consectetur.",
  "Aliquam venenatis urna id laoreet pellentesque.",
  "Suspendisse gravida tellus vitae est suscipit, consequat pellentesque est aliquet.",
  "Sed sollicitudin ipsum vel malesuada dictum.",
  "Aenean convallis orci in semper ullamcorper.",
  "Nullam a lorem ac sapien facilisis finibus.",
  "Sed eu arcu dictum, blandit magna sit amet, eleifend mi.",
  "Suspendisse vitae erat ac urna pharetra fermentum at ut ipsum.",
  "Quisque feugiat tellus eu rhoncus porttitor.",
  "Donec at ipsum mollis, pellentesque urna sed, tempor nisl.",
  "Morbi ac arcu mollis nunc mollis porta.",
  "Morbi mattis lorem sit amet finibus luctus.",
  "Maecenas non risus pulvinar, vestibulum dui vel, luctus nulla.",
  "Maecenas sit amet purus volutpat, fermentum urna id, luctus tellus.",
  "Etiam imperdiet metus non felis aliquam, id dignissim felis sagittis.",
  "Integer mollis nisl nec fringilla dignissim.",
  "Aenean aliquam augue at elit tristique pretium.",
  "In varius velit vel sem lacinia placerat."
]', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare ullamcorper libero id luctus. Cras tincidunt, nunc eget venenatis tincidunt, erat erat mollis lacus, sit amet eleifend odio enim ut dolor. Donec sit amet lacinia felis. Vivamus porta quis ante nec mattis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc et lacus ipsum. Donec in nisl velit. Sed in ultrices dui. Pellentesque eleifend orci metus, eget commodo ante mollis eu. Aliquam hendrerit, lorem non varius pulvinar, turpis lacus fermentum nisi, sit amet tincidunt lectus elit id felis.\n\nPellentesque non nibh ut leo aliquet volutpat. Suspendisse condimentum massa non tellus euismod, ultricies lobortis massa condimentum. Donec aliquam in orci id varius. Nulla iaculis mauris nec purus feugiat bibendum. Fusce sollicitudin elementum ante, vitae feugiat dui vulputate a. Phasellus eget viverra velit. Donec venenatis metus et commodo rhoncus.\n\nAenean faucibus lectus enim, vel eleifend justo commodo eu. Proin faucibus laoreet est et luctus. Curabitur pellentesque posuere felis, id tristique nibh bibendum sit amet. Donec eu accumsan magna. Quisque quis sollicitudin ligula, ut sagittis tellus. Morbi vel consectetur erat, id consectetur nunc. Pellentesque tempor nibh nulla, eu mollis leo dignissim in. Nulla sodales elit felis, sed convallis lectus tempus in. Donec molestie tincidunt sapien. Aenean nibh nibh, accumsan vitae magna vehicula, euismod laoreet libero. Nullam mattis ornare massa, sit amet egestas leo volutpat nec. Nam sit amet eros a elit pellentesque condimentum.\n\nPellentesque dapibus, quam vitae pharetra sollicitudin, mauris dolor ullamcorper lectus, commodo tincidunt enim nibh consectetur tellus. Sed quis neque vitae arcu bibendum congue at vitae dui. Maecenas ultrices condimentum aliquet. Donec vulputate metus sed aliquam mollis. Nullam varius condimentum ipsum, laoreet interdum purus auctor a. Curabitur laoreet leo elit, at gravida lorem dapibus sit amet. Donec congue metus vitae quam malesuada, et faucibus velit dictum. Donec non lacus ut ligula iaculis pulvinar ut in turpis. Sed consequat turpis sed nibh ultrices, id venenatis nisl iaculis. Curabitur gravida consectetur enim in ultricies. Nunc sit amet odio mi. Nam pellentesque ex vel porta dapibus. Pellentesque nunc enim, ullamcorper non posuere at, vestibulum eu lacus. Pellentesque ligula nulla, blandit vel sapien at, varius lobortis erat. In molestie, massa id sollicitudin pretium, ipsum risus malesuada arcu, ac efficitur enim lorem quis odio.\n\nNunc at arcu mattis, convallis urna non, ultrices ligula. Suspendisse tincidunt ex nec est volutpat volutpat. Sed sed erat vitae sem sollicitudin facilisis vel a est. Quisque at massa egestas est dapibus vehicula ac vel lectus. Quisque lacinia at sem sit amet euismod. Nullam dapibus risus neque, mattis tincidunt nibh hendrerit a. Vestibulum ante quam, mattis id ex id, laoreet pharetra risus. Quisque euismod purus non hendrerit scelerisque.');
