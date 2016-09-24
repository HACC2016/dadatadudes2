# Homeless Risk Assessment Dashboard & GraphQL Server

## Development
1. Have [Node](https://nodejs.org/) && [MongoDB](https://www.mongodb.com/download-center#community) installed locally. (Make sure you are using Node v6.x.x and have the mongo daemon running)
1. Install Webpack-Dev-Server globally `npm i -g webpack-dev-server`
1. `npm install` to install node dependencies
1. `source .env && node seed/mongo.js up` to seed local mock data
1. `npm run dev`
1. Navigate to `http://localhost:8000` to see your app in action.
1. Navigate to `http://localhost:8000/graphql` to mess around with the GraphQL API.

## Test out graphiql queries!
```
query TestQuery {
  persons {
    age
    firstName
    lastName
    assessments {
       overallRiskScore
    }
  }
}
```
