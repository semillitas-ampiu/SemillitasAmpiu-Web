# Dockerfile de desarrollo para Semillitas Ampiu Frontend
FROM node:20-alpine

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache git

# Crear directorio de la aplicación
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluye devDependencies para desarrollo)
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto de Vite (5173)
EXPOSE 5173

# Comando para desarrollo con hot reload
# Vite necesita --host 0.0.0.0 para ser accesible desde fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
