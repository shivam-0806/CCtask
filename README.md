### Setup
 - Frontend : React + Vite
 - Backend : Node.js + Express
 - Database : MongoDB (NoSQL) + Mongoose

### Frontend
 - Setting up React and Vite
   - Install node.js
   - Create react app
     ```npm create vite@latest my-app --template react```
     ```cd my-app```
     ```npm install```
     ```npm run dev```
   - App will be live at some localhost port
  
- Rendering the map
   - I used MapLibre GL JS.
   - I tried a variety of styles before settling upon ```streets-v2``` style.
   - First I created a `MapComponent.jsx` file to render the map which was later replaced by `Nominatim.jsx` upon integrating the search, add location and review functionality.

- Search functionality
   - I used OpenStreetMap's Nominatim API for the search.
   - For UI, I added a simple searchbox with a search button.
   - I also added a toggle sidebar on the right, to show where one is.<br>Later review functionality was also added to it.
   - I also added a popup marker with the name of the place at the location searched.<br>

Onto backend.
 
### Backend
- Connecting with MongoDB
   - I used the follwing tutorial for initial setup followed by chatGPT<br>```https://youtu.be/SV0o0qOmKOQ?si=xJmHa4oSkHLeZuv2```
    - I created a database `test` with `locations` collection to store the added locations with their name, description and corrdinates.
    - Installed express, mongoose, cors, dotenv.
    
- Location addition
   - I used `fetch`, `GET` and `POST` to communicate with the server and database.
   - `GET` returned the list of the saved locations in the database.
   - `POST` helped in adding new locations to the collection.
   - For UI, i added a click-to-add functionality on the map. You click on the coordinates, enter name and description in a box and simply add location. It alerts if it is added successfully or not.
 
- Review addition
   - Tried but failed
   - Added input box in sidebar with 5-scale rating system, to add reviews for places 'searched'.

### Things I tried but failed
 - Finding a better, more detailed map.
 - Failed to properly deploy the review functionality. For now it throws out an error.
 - Tried to add a Click-to-View functionality where one would click on a coordinate and it would spit out the name, description etc.
 - Wanted to limit the map's area to IITK only, but once I did that using `maxBounds`, if I searched Washington, the sidebar would display Washington, meaning it was going to Washington but due to bounds, it was not being displayed.
 - So, in a nutshell, couldn't apply `maxBounds` properly and ended up removing it entirely.
 - If click at multiples places to add, it doesn't remove the previous ones. So the location is added with the coordinates of the most recent one.


### Things I want to do
 - Add a Click-to-View functionality as described above.
 - In the popup sidebar, I wanted to add sections for review, images etc. like Google Maps.
 - To limit the search to IITK only I am thinking of using `regex` to find the first occurence containing `iit kanpur`.
 - Clean up the hierarchy.
 - Add login/signup functionality.
 - Add a Add Location functionality but custom for each user. Like it is in Google Maps, customized Home, Work etc.
 - Include the local addition of places in my search functionality.
  
     


   

