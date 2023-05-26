# Base sur l'image officielle Node.js
FROM node:18

# Crée le répertoire de l'application
WORKDIR /usr/src/app

# Installe les dépendances de l'application
# Un wildcard (*) est utilisé pour s'assurer que package.json ET package-lock.json sont bien copiés
# Les packages qui existent dans package-lock.json seront installés
COPY package*.json ./

RUN npm install

# Bundle de l'application source
COPY . .

# Expose le port que l'application utilise
# Note: Discord.js utilise généralement des WebSockets, donc il n'est pas nécessaire d'exposer un port 
# à moins que votre application n'utilise une fonctionnalité qui nécessite l'exposition d'un port.

# Démarre le bot
CMD [ "node", "bot.js" ]
