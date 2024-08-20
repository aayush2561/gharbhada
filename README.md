# Gharbhada

Gharbhada is small version of a room rental application with feature like blogs,post listing,
user information,edit user profile and also admin section to delete post users and blogs.

**Note** : app is not responsive.

## Screenshot
![screenshots](https://github.com/aayush2561/gharbhada/blob/main/client/Preview.png)

## Features
- User Authentication:Signup with profile image and proper validation and login with remember me section and jwt token.

- Search and browse rooms : User can search and browse for room with different feature and description listed and option to see user profile to connect with them.

- Post rooms and blogs : User can post blog from their profile and also post rooms.

- Protected Route: Routes are protected so only logged in users can access .

- Admin panel : Admin panel to delete users, posts and blogs {protected with rate limiting and route is also protected.}

- Ai chat integration and mail : Using HUGGING face API added a chat with ai and also can contect with the devloper using contact form where user can send mail with help of nodemailer.

## Technology Used

- React - frontend 
- Node and express -Backend
- Mongodb - Database

## Build Frontend
````
npm run dev
````

    
## Build backend
````
npm start
````
## Link 
https://gharbhada-frontend.vercel.app
