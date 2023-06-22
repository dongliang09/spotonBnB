# Introdution
This website is a clone of airBnB. You can view all spots on the landing page. Clicking on each spot, you can view more details.
After log in, you can create/update/delete spots and create/delete reviews/rating.

# Technology

- React - An frontend library for building user interfaces.
- Redux - A predictable, centralized state container for JavaScript apps.
- Database - Development: SQlite3

# Screenshot of Project

![Landing Page](https://github.com/dongliang09/spotonBnB/assets/67977179/e6a926d7-787c-47c6-a916-330a8a46fdcc)
![My Spot Page](https://github.com/dongliang09/spotonBnB/assets/67977179/69506d28-6cf6-465b-8432-1f054761d8d8)
![My Booking Page](https://github.com/dongliang09/spotonBnB/assets/67977179/c331b9e9-9d0d-4a7b-a626-d68f9a7a9edb)

# Setup

1. In the terminal, cd into the ```backend``` directory.
2. Install dependencies with ```npm install```.
3. Copy the ```.env.example``` file to a new file in the same location called ```.env```.
- The server should be listening for requests on port ```8000```.
- The SQLite3 database file should be ```db/dev.db```.
- Put in your own secret string for  ```JWT_SECRET``` and ```SCHEMA```
- Run
```npx dotenv sequelize-cli db:migrate``` - create the database and tables
- Run ```npx dotenv sequelize-cli db:seed:all``` - insert seed data
- Run ```npm start``` - start the backend server
4. In a different terminal, cd into the frontend directory of the starter.

- Run ```npm install``` in the ```frontend``` directory.
- Run ```npm start``` in the frontend directory to start the server.
Note that the package.json now defines a proxy of http://localhost:8000. This will effectively forward any unrecognized requests to the port (8000) on which your backend is listening.
Open http://localhost:3000 to see the frontend.

# Struggle

### Image went outside of grid cell
* On spot detail page, I defined the layout with grid, the 4 pictures of the right side gave me the most trouble. The picture went outside the grid cells.
* The one on the left side was fine when I set the width 100% and max-height 100% and object-fit:cover.
* I thought 4 pictures would do the same when I apply those properties.
* The solution is to set the grid area, each grid area will also have width 100% and max-height 100% and object-fit:cover


### Booking
* The package react-dates is using moment.js, so I need to convert momemnt to built-in javaScript new Date()
* const timestamp = new Date();
* const momentTimestamp = moment(timestamp);

### Use fontAwesome icon as Marker on google map API
* The document says I can put the url of the img on the icon property, but I I just want to use the fontAwesome icon without installing any new dependency or putting any image in my project.
* I saw one example importing an icon from a dependency, that is close to what I want, but not there yet.
* At the end, I figure out I just need to replace the path with the one on SVG from fontAwesome website
* Also latitude and longitude must be number type
