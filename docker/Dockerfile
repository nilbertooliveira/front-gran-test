FROM node:18-alpine

RUN addgroup app && adduser -S -G app app
RUN mkdir -p /app && chown -R app:app /app

WORKDIR /app

# Copy existing permission directory permissions
COPY --chown=app:app . /app

COPY package*.json ./
RUN npm install
COPY . .

USER app

ENV NODE_ENV="development"
ENV PORT="3000"

#ENTRYPOINT ["npm", "run", "serve"]