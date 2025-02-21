# ImagiNest

## Overview
ImagiNest is a **photo curation backend** that allows users to search for images using the **Unsplash API**, save them to collections, add tags, search by tags, and track search history. This backend provides APIs for managing users, photos, and search history efficiently.

## Features
- **Image Search**: Users can search for images via the Unsplash API.
- **Collections**: Users can save images to collections.
- **Tagging**: Add tags to photos for better organization and searching.
- **Search History**: Track past searches for quick reference.
- **Public API Access**: Users can interact with the API endpoints without authentication.

## Technologies Used
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Sequelize
- **API**: Unsplash API (for fetching image data)

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ImagiNest.git
   cd ImagiNest
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   UNSPLASH_SECRET_KEY=your_unsplash_secret_key
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=your_db_host
   DB_PORT=5432
   PORT=3000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   or for development mode with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints
### User Management
- `POST /api/users` - Create a new user.

### Image Search & Management
- `GET /api/photos/search` - Search for images using the Unsplash API.
- `POST /api/photos` - Save a photo to a collection.
- `POST /api/photos/:photoId/tags` - Add a tag to a photo.

### Search & Tag Filtering
- `GET /api/photos/tag/search` - Search photos by tags.
- `GET /api/search-history` - Retrieve search history.

## API Configuration
To fetch images, you need an API key from Unsplash:
1. Sign up at [Unsplash](https://unsplash.com/developers).
2. Register an application and generate an API key.
3. Add the key to your `.env` file as shown above.

## Usage
- **Search Photos**: Query images using the Unsplash API.
- **Save & Organize**: Store selected images in collections.
- **Tag & Search**: Add tags to photos and filter by tags.
- **Track Searches**: Retrieve previous search queries for reference.

## Database Models
- **Photo**: Stores image metadata.
- **SearchHistory**: Logs past search queries.
- **Tag**: Manages tags assigned to photos.
- **User**: Handles user data.

## Acknowledgments
- **Unsplash API** for providing image data.
- **Node.js & Express.js** for backend development.
- **PostgreSQL & Sequelize** for database management.
- **Supabase** for hosting the database.

---
This backend serves as a foundation for a photo curation app, and additional features can be implemented to enhance functionality. 🚀
