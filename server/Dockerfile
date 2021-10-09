FROM node:14-alpine

# Step 1 - Add container working directory
WORKDIR /app
# Step 2 - Copy npm dependencies
COPY package*.json ./
# Step 3 - Install dependencies
RUN yarn install
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 8080
CMD [ "yarn", "start" ]