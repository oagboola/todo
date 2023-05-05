# TODO APP

This app is a basic todo app that allows the user to create an account, log in and create a todo list. The user is also able to update, complete and delete todos.

The app is hosted at:

https://app-academy-todo.herokuapp.com/

## Development

To get the app started on your local machine

- run `npm install` in the root directory
- run `db:migrate` to run migrations
- run `npm install` in the client folder
- run `npm start` in the root of the folder to start the backend
- run `npm start` in client folder to start the frontend
- If no PORT is provided for the backend, your server will be running at `https://localhost:3000`

Provide the following environment variables:

- DB_USERNAME
- DB_PASSWORD
- DB_NAME
- DB_HOST
- NODE_ENV
- SECRET

## Testing

- run `db:create:test` to create test database
- run `db:migrate` to run migrations
- run `npm run test`
