# Utilisation de l'image Node.js 14 en tant qu'image de base
FROM node:18.16.0

# Installation de pnpm de manière globale
RUN npm install -g pnpm

# Création d'un répertoire de travail dans le conteneur
WORKDIR /app

# Copie du package.json et du pnpm-lock.yaml dans le répertoire de travail
COPY package.json /app

# Copie de tout le contenu de l'application dans le répertoire de travail
COPY . /app

# Installation des dépendances avec pnpm
RUN pnpm install --frozen-lockfile

# Variable d'environnement pour le port
ENV PORT=3200
ENV NODE_ENV='production'

# Exposition du port sur lequel l'application Nest.js écoute (par défaut : 3200)
EXPOSE 3200

# Exécution de la commande "prisma generate" pour générer les fichiers Prisma
#RUN npx prisma generate

#RUN npx prisma db seed

# # Creates a "dist" folder with the production build
RUN pnpm run build


# Commande pour démarrer l'application Nest.js
CMD [ "pnpm", "start:prod" ]