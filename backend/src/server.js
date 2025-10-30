require('dotenv').config();
const express = require('express');
const cors = require('cors');
const diplomaRoutes = require('./routes/diplomaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/diplomas', diplomaRoutes);
app.use('/api/auth', authRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({ 
    message: 'DiploChain Africa API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      diplomas: '/api/diplomas'
    }
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Une erreur est survenue sur le serveur'
  });
});

// Route 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée'
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Hedera Service initialisé`);
  console.log(`🚀 Serveur démarré sur port ${PORT}`);
  console.log(`📍 http://localhost:5000`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n📋 Routes disponibles :`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   POST   /api/auth/verify`);
  console.log(`   POST   /api/auth/logout`);
  console.log(`   GET    /api/auth/universities`);
  console.log(`   POST   /api/diplomas/issue`);
  console.log(`   GET    /api/diplomas/verify/:serial`);
  console.log(`   GET    /api/diplomas`);
});

module.exports = app;