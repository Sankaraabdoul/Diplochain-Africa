// Liste des universités autorisées (en production, utilisez une vraie DB)
const universities = [
  {
    id: 1,
    name: 'Université de Ouagadougou',
    email: 'admin@univ-ouaga.bf',
    password: 'ouaga2025', // En production, utilisez bcrypt pour hasher
    country: 'Burkina Faso',
    city: 'Ouagadougou'
  },
  {
    id: 2,
    name: 'Université Cheikh Anta Diop',
    email: 'admin@ucad.sn',
    password: 'ucad2025',
    country: 'Senegal',
    city: 'Dakar'
  },
  {
    id: 3,
    name: 'Université Félix Houphouët-Boigny',
    email: 'admin@ufhb.ci',
    password: 'ufhb2025',
    country: 'Cote d\'Ivoire',
    city: 'Abidjan'
  }
];

// Variable pour stocker les sessions actives
let activeSessions = [];

// @desc    Login université
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email et mot de passe requis'
      });
    }
    
    // Chercher l'université
    const university = universities.find(
      u => u.email === email && u.password === password
    );
    
    if (!university) {
      return res.status(401).json({
        success: false,
        error: 'Email ou mot de passe incorrect'
      });
    }
    
    // Créer une session
    const session = {
      sessionId: Date.now().toString(),
      universityId: university.id,
      universityName: university.name,
      email: university.email,
      country: university.country,
      city: university.city,
      loginAt: new Date()
    };
    
    activeSessions.push(session);
    
    console.log(`✅ Login réussi: ${university.name}`);
    
    res.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        sessionId: session.sessionId,
        university: {
          id: university.id,
          name: university.name,
          email: university.email,
          country: university.country,
          city: university.city
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Vérifier une session
// @route   POST /api/auth/verify
exports.verifySession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(401).json({
        success: false,
        error: 'Session non fournie'
      });
    }
    
    const session = activeSessions.find(s => s.sessionId === sessionId);
    
    if (!session) {
      return res.status(401).json({
        success: false,
        error: 'Session invalide ou expirée'
      });
    }
    
    const university = universities.find(u => u.id === session.universityId);
    
    res.json({
      success: true,
      data: {
        university: {
          id: university.id,
          name: university.name,
          email: university.email,
          country: university.country,
          city: university.city
        }
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Logout
// @route   POST /api/auth/logout
exports.logout = async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    activeSessions = activeSessions.filter(s => s.sessionId !== sessionId);
    
    console.log(`👋 Déconnexion`);
    
    res.json({
      success: true,
      message: 'Déconnexion réussie'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtenir toutes les universités (pour info)
// @route   GET /api/auth/universities
exports.getUniversities = async (req, res) => {
  try {
    // Ne pas renvoyer les mots de passe
    const universitiesPublic = universities.map(u => ({
      id: u.id,
      name: u.name,
      country: u.country,
      city: u.city
    }));
    
    res.json({
      success: true,
      data: universitiesPublic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};