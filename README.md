# Customer Profile - Client App
Customer profile dashboard app that is powered by [Customer Profile API](https://github.com/emmafallancy/customer-profile-api).

## Overview
This is the client app for the customer profile dashboard app. This app is bootstrap from `create-react-app` and the data will be pulled from the [Customer Profile API](https://github.com/emmafallancy/customer-profile-api).

Once the data is fetched, the user will be able to see the list of customer profiles fetched from the API.

## Installing dependencies
To run the API, make sure to install the dependencies. To install the dependencies, run the command below:

Using `yarn`:
```sh
yarn install
```

Using `NPM`:
```sh
npm install
```

## Running the application
To run the application, make sure to have all the dependencies installed. Refer to the section above to install the dependencies.

For simplicity, run the server based on the following command:

```sh
# yarn
yarn start

# or if you prefer NPM
npm run start
```

**IMPORTANT**: Make sure to start the [Customer Profile API](https://github.com/emmafallancy/customer-profile-api) server before running the client application. To run the server, refer to the instructions in the API repo.

By default, the server will run at `http://localhost:3000`. The API request base endpoint will default to `http://localhost:4200`.

## Testing
The test can be run by the referring to the command below.

```sh
# yarn
yarn test
```

```sh
# NPM
npm run test
```
