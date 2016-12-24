FROM node:boron
MAINTAINER Areth <al.reshetnikov@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000 3002 9000 9002

# Use entrypoint instead of CMD to be able to pass parameters
ENTRYPOINT ["/usr/src/app/docker-start.sh"]