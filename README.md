# Line Up Coding Exercise

<img alt="Logo" align="right" src="https://img.freepik.com/free-vector/multicultural-people-standing-together_74855-6583.jpg?w=1800" width="30%" />

Welcome to this repo and project, delivering you all the data of users from [https://reqres.in](https://reqres.in) in a tiny shiny dashboard.

Small React app using the following libraries and tools:

- create-react-app

- react-router-dom

- grommet

- styled components

- prettier, lint-staged, husky

- axios

## Project design and decisions

I worked with a dop-down approach starting breaking the UI into one component and then refactoring with the needed features and UI sub-components.
The pagination with the query param works only with page = 1, 2 with some redirection to users page e.g. http://localhost:3000](http://localhost:3000) redirects to [http://localhost:3000/users?page=1](http://localhost:3000/users?page=1)
I used prettier, lint-staged, husky to maintain the same style and format the code on git commits.
The state management used is useState but redux and redux query could be added to add predictability and scalability.

- Choosing interfaces over types for props.

- Features structure of the project for scalability.

- Pagination of users in a dashboard using react router to go to the user card of the specified user.

## Run the project

In the project directory run:

- `npm start`

To run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm test`

To run the tests.

`npm run build`

To build the project.
