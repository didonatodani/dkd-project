# Feedback

## Overall structure
- The overall structure of the project is clear and easy to follow. 
- The README file is well-structured and provides a good overview of the project. 

## Use of supabase
- You handled the supabase requests properly and the data is displayed correctly.
- In some requests you could have used supabase also to filter the data. In bigger projects where you have a database with a lot of data, it's better to filter the data on the server side.

## React-router
- The use of react-router is well implemented and the navigation between the different pages is smooth.
- The fact that you used hashRouter instead of BrowserRouter is a good choice, as it allows you to deploy the app on Netlify without any issues.

## Functions folder
- The functions folder was a good Idea to separate and reuse the functions in different components. I see you finally didn't use it. My suggestion is to delete it if you are not going to use it.
Functions like the `getMovies` in the `app.jsx` could be handled there if you add the setMovies function as a parameter.

## Components
- The components are well structured and reusable.
- The use of props is well implemented and the components are easy to understand.
- Some of the pages include code that could be extracted into a separate component. 

## Styling
- Keeping the css in a separate file is a good practice for better readability on each component.
- You've centralized the form styling in another file with the styles they share. This is a good practice to avoid repeating the same styles in different components.

## Use of AI 
- When asking an AI to solve a problem, it's important to understand its limitations. The code it provides is not always the best/simplest solution, and it's important to review it and understand what it's doing. Try to ask more specific questions to get better results and also ask for explanations of the code provided.