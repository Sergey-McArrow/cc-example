# Bun official image
FROM oven/bun:1.1

WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .

# Build the app (Vite by default)
RUN bun run build

# Preview port for Vite
EXPOSE 4173

# Run with binding to all interfaces using --host
CMD ["bunx", "vite", "preview", "--host"]
