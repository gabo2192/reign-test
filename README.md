# README 
## Reign Test
This is a monorepo created using:
- [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [NestJS](https://nestjs.com/)

## How to run this
For running this project you need this following steps:
1.  `docker compose build`
2.  `docker compose up`

This will create a docker instance of [MongoDB](https://www.mongodb.com/), and also run client and server both in ports: `5000` and `4000` respectively. Once both client and server are running you just need to go to the client and the server will trigger a fetch to the API by default on the first time. After that it will periodically update every hour on minute 0 and second 0 (9:00:00AM).

## Why Yarn Workspaces
Yarn workspaces allows you to build monorepos and link them together, you can share dependencies and link packages inside which I find amazing. As notice I was also able to create one single Dockerfile to deploy the whole application by using and NPM package named [concurrently](https://github.com/open-cli-tools/concurrently) to run both instances of the server and client at the same time.

### Why Vite
Vite uses native ESM build based dev server, which makes HMR really fast it doesn't need to update de whole server it only needs to precisely invalidate the chain between the edited module and its closest HMR boundary. You can use it not only with React but also with many JS flavors.
![vite-dev-server](https://vitejs.dev/assets/esm.3070012d.png)

## How the server is implemented
For the server side we have implemented a connection with a local image of a database in MongoDB and a module name posts that takes care of 3 actions: 
- Get posts data from the database.
- Add new posts from the API and persist them in the database.
- Delete a post from the database when user deletes it using its ID.

## How the client is implemented
It's a React application really straight forward, that fetches a list of post from the server using browser fetch API. We trigger a fetch on the page first render using a React Hook, [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) and stores the posts in the cache using anothe hook named [useState](https://reactjs.org/docs/hooks-reference.html#usestate) we handle user click to redirect it to a new page and when user clicks on the bucket it triggers a delete actions that not only removes it from local state but also from the database aswell. Everything is typed-safe using Typescript.

Gabriel Rojas
