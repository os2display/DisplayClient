# DisplayClient
A display client for OS2Display ver. 2, currently a work in progress.

Currently, this is a create-react-app.

## Docker

@TODO: Provide a docker setup, and modify readme to use docker instead.

## Install

Install the node modules using yarn.

```
yarn
```
## Start

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

```
yarn start
```

## Build
Builds the app for production to the build folder.

@TODO: Add production build instructions.


## Coding standards

For code analysis we use the [Airbnb style guide for javascript](https://github.com/airbnb/javascript) and for formatting we use [Prettier](https://github.com/prettier/prettier).

```
# Check for coding standards issues
yarn check-coding-standards

# Auto-correct coding standards issues
yarn apply-coding-standards
```

## Testing with cypress

We use [cypress](https://www.cypress.io/) for testing.


```
yarn test
```

Or spinning up electron:

```
test-ui
```



