
#Pull the base image from repo.

FROM node

#Get the latest source from Git

RUN git clone https://f56f333d622d444e2615f581da9b5adca07581fd:x-oauth-basic@github.com/peeyar/url-shortner.git    /src

# set working folder.

WORKDIR /src/url-shortner

#dont request ssl
RUN npm config set strict-ssl fasle

#install dependencies.
RUN npm install

# expose the application port
EXPOSE 5000

CMD [ "npm", "start" ]

RUN mocha Tests/base58test.js

RUN mocha Tests/intgTest.js

