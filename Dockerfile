FROM node:16.20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json are copied
# where available (npm@5+)
COPY . .
COPY package*.json lerna.json yarn.lock ./

# Install log-rotate module and configure it
RUN yarn global add pm2 typescript
RUN pm2 install pm2-logrotate
RUN set pm2-logrotate:max_size 1G

RUN yarn install --frozen-lockfile
RUN yarn generate:docs
RUN yarn build

CMD ["pm2-runtime", "ecosystem.config.js"]