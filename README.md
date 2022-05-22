# Color Palettes App

## Visit live demo in [React Color Palettes](https://color-palettes-tomascatena.vercel.app/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `./dist` folder.

### Linting Scripts

### `npm run lint`

Runs eslint

### `npm run lint:fix`

Runs eslint with `--fix` option

### Testing Scripts

### `npm run test`

Runs all the test files with jest

### `npm run test:watch`

Runs all the test files with jest in watch mode

***

### Storybook

Open [Project's Storybook](https://main--62654b5babdb4b004aad2d72.chromatic.com) to view the published Storybook of the project in Chromatic.

### `npm run storybook`

Runs the the storybook for development

### `npm run build-storybook`

Build the static files for the storybook of the project.

### `npm run chromatic`

Publish the storybook of the project in Chromatic.

***

### Docker Compose

#### Development Environment

Build development environment\
`docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d --build`

Teardown development environment\
`docker-compose -f docker-compose.yml -f docker-compose-dev.yml down -v`

#### Production Environment

Build production environment\
`docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build`

Teardown production environment\
`docker-compose -f docker-compose.yml -f docker-compose-prod.yml down -v`

***

### Docker

Build image (development)\
`DOCKER_BUILDKIT=1 docker build -f ./Dockerfile.dev -t react-color-palettes-image .`

`-t: tag the image with a custom name of react-color-palettes-image`\
`-f: Dockerfile to use`

Run container (development)\
`docker run -v $(pwd)/src:/project/src:ro -d -p 3000:3000 --env-file ./.env --name react-color-palettes-app react-color-palettes-image`

`-d: run container in background and print container id`\
`-p: map port in host (3000, left side) to port in container (3000, right side)`\
`-v: use a volume to sync the /src folder from the host machine to the /src of the container :ro read only`\
`-e: set value of environment variable`\
`--env-file: file with environmental variables`\
`--name: react-color-palettes-app give a custom name to the docker container`

Build image (production)\
`DOCKER_BUILDKIT=1 docker build -f ./Dockerfile.prod -t react-color-palettes-image-prod .`

`-t: tag the image with a custom name of react-color-palettes-image-prod`\
`-f: Dockerfile to use`

Run container (production)\
`docker run -d -p 8080:80 --env-file ./.env --name react-color-palettes-app-prod react-color-palettes-image-prod`

`-d: run container in background and print container id`\
`-p: map port in host (8080, left side) to port in container (80, right side NGINX)`\
`-e: set value of environment variable`\
`--env-file: file with environmental variables`\
`--name: react-color-palettes-app give a custom name to the docker container`

Stop container\
`docker stop react-color-palettes-app`

Remove container\
`docker rm react-color-palettes-app`

Remove running container\
`docker rm react-color-palettes-app -f`

Open a shell session in the working directory of the container\
`docker exec -it react-color-palettes-app sh`

***
