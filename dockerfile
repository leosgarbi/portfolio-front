# Stage 1: Builder - for building the Next.js application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Runner - for running the production application
FROM node:20-alpine AS runner
WORKDIR /app
# Set environment variable for production
ENV NODE_ENV production
# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
# Expose the port the app runs on (default 3000 for Next.js)
EXPOSE 3000
# Start the production server
CMD ["npm", "start"]
