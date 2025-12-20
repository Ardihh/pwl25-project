# Gunakan versi Node yang lebih baru (LTS) agar kompatibel dengan library terbaru
FROM node:20-alpine

# Tentukan direktori kerja
WORKDIR /app

# Copy package files terlebih dahulu agar bisa memanfaatkan layer caching
COPY package*.json ./

# Tambahkan timeout dan retry agar tidak gagal saat sinyal hotspot lemah
RUN npm config set fetch-retry-maxtimeout 600000 && \
    npm config set fetch-retry-mintimeout 100000 && \
    npm install

# Copy seluruh kode backend
COPY . .

# Expose port sesuai .env (port 3000)
EXPOSE 3000

# Jalankan perintah dev
CMD ["npm", "run", "dev"]