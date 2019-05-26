FROM node:11.13.0-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git
RUN apk add curl
RUN apk add sudo
RUN apk add groupadd
RUN apk add useradd
RUN groupadd -g 1000 developer && \
    useradd  -g      developer -G sudo -m -s /bin/bash gogotea && \
    echo 'gogotea:55t' | chpasswd
RUN echo 'Defaults visiblepw'             >> /etc/sudoers
RUN echo 'gogotea ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers


# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN yarn install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn run build:prod

# expose 80 on container
EXPOSE 80

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=80

# start the app
CMD [ "sudo", "yarn", "start:prod" ]