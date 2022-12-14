# `Todolister`

With TodoLister you can write down the most important tasks for the day, week or month. You can always edit or delete your task. 
Don't worry to close dotolister, when you next time open the App, all tasks will be restored. 

Deployed to GitHub Pages: https://elizpn.github.io/todo-list/

-  Language - [TypeScript](https://www.typescriptlang.org/)
-  Data storage - [Local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
-  Client Framework - [React](https://reactjs.org)
-  Testing - [Jest](https://jestjs.io), [React Testing Library](https://testing-library.com)
-  Styles - [Material UI](https://mui.com/) 


## Architecture: 
<img src="./public/architecture_todo.png" title="Architecture Diagram">
 


## Implementation specifics:
Data is stored in local storage.

## Screenshots:

### Desktop (macOS, Chrome):
 
 <img src="./public/screenshot_todo.png" title="Full screenshot">


## Development

Install all dependencies, in repo's root:

### `$ yarn`

In the project directory, you can run:

### `$ yarn start`

Runs the app in the development mode.

Open http://localhost:3000 to view it in the browser.

Run unit rests:

#### `$ yarn test`

Predeploy and deploy:

#### `$ yarn predeploy && yarn deploy`

