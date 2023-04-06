# Quiz rolyale

A quiz like game built on top of Nodejs and React for Kubernetes.

##### Prerequisits
- Docker
- Docker Compose
- Nodejs
- Configure the API Server env variables to include: 
  - `MONGO_IP`: The name of the docker container/k8s-statefulset for mongodb
  - `MONGO_INITDB_ROOT_USERNAME`: User for authenticating on the database
  - `MONGO_INITDB_ROOT_PASSWORD`: Password for the mongo user
  - `MONGO_INITDB_DATABASE`: Database that will be created to store our nosql documents
  - `MONGO_PORT`: The port on which the mongo db will connect, ussually is 27017.
  - `NODE_PORT`: The port on where the API server will listen for requests.
  - `QUIZ_API_KEY`: Your API key to the quizapi.io
  - `SECRET_TOKEN`: The token for generating the user jwt on login/signup

    `Note that this .env file should be created in the /server folder.`

##### Running the applicaiton
Having this env file created the docker application can be runned with the command: `docker-compose -f docker-compose.yml up -V --build -d`