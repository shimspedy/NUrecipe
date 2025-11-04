# Recipe App

A full-featured recipe sharing application built with Express.js, EJS templating, and Bootstrap for styling.

## Features

- **Home Page**: Welcome page with featured recipes and quick navigation
- **Browse Recipes**: View all recipes with search and filter functionality
- **Recipe Details**: Detailed view of individual recipes with ingredients checklist
- **Add Recipe**: Form to submit new recipes to the collection
- **About Page**: Information about the application and its features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Pages

1. **Home (`/`)** - Landing page with featured recipes
2. **All Recipes (`/recipes`)** - Browse and search all recipes
3. **Recipe Detail (`/recipes/:id`)** - Detailed view of a specific recipe
4. **Add Recipe (`/add-recipe`)** - Form to add new recipes
5. **About (`/about`)** - Information about the app

## Tech Stack

- **Backend**: Node.js with Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Bootstrap 5 + Custom CSS
- **Frontend**: Vanilla JavaScript for interactivity

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd recipe-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`

## Project Structure

```
recipe-app/
├── public/                 # Static assets
│   ├── css/
│   │   └── style.css      # Custom styles
│   └── js/
│       └── main.js        # Client-side JavaScript
├── views/                 # EJS templates
│   ├── partials/
│   │   ├── header.ejs     # Navigation header
│   │   └── footer.ejs     # Page footer
│   ├── index.ejs          # Home page
│   ├── recipes.ejs        # All recipes page
│   ├── recipe-detail.ejs  # Single recipe view
│   ├── add-recipe.ejs     # Add recipe form
│   ├── about.ejs          # About page
│   └── 404.ejs           # Error page
├── server.js              # Main application server
├── package.json           # Project configuration
└── README.md             # Project documentation
```

## Features in Detail

### Recipe Management
- Add new recipes with ingredients, instructions, and metadata
- View recipes with formatted ingredients and step-by-step instructions
- Search recipes by title or description
- Filter by category and difficulty level

### User Experience
- Responsive design that works on all devices
- Interactive ingredients checklist
- Print-friendly recipe pages
- Smooth animations and transitions
- Form validation for recipe submission

### Technical Features
- RESTful routing structure
- Template inheritance with EJS partials
- Client-side search and filtering
- Bootstrap components for UI consistency
- Custom CSS for enhanced styling

## Customization

### Adding New Categories
Edit the category options in `views/add-recipe.ejs` and update the filter in `views/recipes.ejs`.

### Styling
Modify `public/css/style.css` to customize the appearance. The app uses Bootstrap 5 as the base framework.

### Database Integration
Currently uses in-memory storage. To add a database:
1. Install a database driver (e.g., `npm install mongoose` for MongoDB)
2. Create database models
3. Update the routes in `server.js` to use database operations

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload (requires nodemon)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- User authentication and profiles
- Recipe ratings and reviews
- Image upload for recipes
- Recipe categories and tags
- Favorite recipes functionality
- Social sharing features
- Recipe import from URLs
- Nutritional information
- Shopping list generation
- Recipe scaling (adjust servings)# NUrecipe
