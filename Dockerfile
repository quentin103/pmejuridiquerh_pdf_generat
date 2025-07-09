# Dockerfile corrigé
FROM node:18.16.0

# Installation des dépendances système pour Chrome/Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    xdg-utils \
    libu2f-udev \
    libvulkan1 \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Installation de pnpm de manière globale
RUN npm install -g pnpm

# Création d'un répertoire de travail dans le conteneur
WORKDIR /app

# Copie du package.json dans le répertoire de travail
COPY package.json /app

# Installation des dépendances avec pnpm
RUN pnpm install

# Installation de Chrome pour Puppeteer
RUN npx puppeteer browsers install chrome

# Copie de tout le contenu de l'application dans le répertoire de travail
COPY . /app

# Variables d'environnement
ENV PORT=3000
ENV NODE_ENV='production'
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false
ENV PUPPETEER_CACHE_DIR=/app/.cache/puppeteer

# Création du répertoire cache et permissions
RUN mkdir -p /app/.cache/puppeteer && \
    chown -R node:node /app/.cache/puppeteer

# Build de l'application
RUN pnpm run build

# Exposition du port
EXPOSE 3000

# Utilisateur non-root pour la sécurité
USER node

# Commande pour démarrer l'application avec Xvfb (affichage virtuel)
CMD ["sh", "-c", "Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 & pnpm start:prod"]

# Alternative: Version optimisée avec multi-stage
# FROM node:18.16.0 AS builder
# 
# RUN npm install -g pnpm
# WORKDIR /app
# COPY package.json ./
# RUN pnpm install
# COPY . .
# RUN pnpm run build
# 
# FROM node:18.16.0 AS production
# 
# # Installation des dépendances système
# RUN apt-get update && apt-get install -y \
#     chromium \
#     fonts-liberation \
#     libasound2 \
#     libatk-bridge2.0-0 \
#     libdrm2 \
#     libgtk-3-0 \
#     libgtk-4-1 \
#     libnss3 \
#     libxcomposite1 \
#     libxdamage1 \
#     libxrandr2 \
#     xvfb \
#     && rm -rf /var/lib/apt/lists/*
# 
# RUN npm install -g pnpm
# WORKDIR /app
# 
# # Variables d'environnement
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
# ENV DISPLAY=:99
# 
# COPY package.json ./
# RUN pnpm install --production
# COPY --from=builder /app/dist ./dist
# 
# USER node
# EXPOSE 3000
# CMD ["sh", "-c", "Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 & pnpm start:prod"]