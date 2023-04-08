FROM node:19-alpine AS development
WORKDIR /usr/src/app/frontend 
#don't run npm install each time code changes
COPY package.json .
RUN npm install --force 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]


FROM node:latest AS builder
WORKDIR /usr/src/app/frontend
COPY package.json .
RUN npm install 
COPY . .
RUN npm run build



#use the latest nginx image 
FROM nginx:latest AS production
# remove the default nginx configuration file 
RUN rm /etc/nginx/nginx.conf
# copy the custom nginx.conf file from the host to the container 
COPY nginx.conf /etc/nginx
# copy the final react build to the container to be serverd by nginx
COPY --from=builder /usr/src/app/frontend/build /usr/share/nginx/html
#to be accessible by other containers 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]