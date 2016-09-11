# Homeless Risk Assessment Dashboard & GraphQL Server

Uses the wonderful [React Apollo Starter Kit](https://github.com/saikat/react-apollo-starter-kit) by [saikat](https://github.com/saikat).

## Technical Stack
* [React](https://facebook.github.io/react/) for frontend development
* [GraphQL](http://graphql.org/) for backend API
* [Apollo](http://apollostack.com) for backend/frontend data flow management
* [Redux](http://redux.js.org/) for frontend data management. Apollo integrates with Redux.
* [React-router](https://github.com/reactjs/react-router) for clientside routing
* [Aphrodite](https://github.com/Khan/aphrodite) for styling
* [Express](http://expressjs.com/) for the server
* [Webpack](https://webpack.github.io/) for development server + hot reloading clientside stuff
* [Nodemon](https://github.com/remy/nodemon) for hot reloading backend code
* [Node-foreman](https://github.com/strongloop/node-foreman) for running both the Webpack server and Express server
* [ESLint](http://eslint.org/) to keep your Javascript style consistent
* [Babel](https://babeljs.io/) to use the latest Javascript language features

## Development
1. Have [Node](https://nodejs.org/) && [ArangoDB](https://www.arangodb.com/download) installed locally.
1. `npm install`
1. `npm run dev`
1. Navigate to `http://localhost:3000` to see your app in action.
1. Navigate to `http://localhost:3000/graphql` to mess around with the GraphQL API.
1. Start making changes by working in the `src` directory
