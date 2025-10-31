import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si déjà connecté, rediriger
    const session = localStorage.getItem('university_session');
    if (session) {
      navigate('/issue');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://veritrust-dozy.onrender.com/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Sauvegarder la session
      localStorage.setItem('university_session', response.data.data.sessionId);
      localStorage.setItem('university_data', JSON.stringify(response.data.data.university));

      console.log('✅ Connexion réussie:', response.data);

      // Rediriger vers la page de création
      navigate('/issue');

    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de connexion');
      console.error('❌ Erreur login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2e3e50 0%, #1a1f2e 100%)',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '42px', color: 'white', marginBottom: '10px' }}>
            🏛️ Espace Université
          </h1>
          <p style={{ fontSize: '18px', color: '#f0f0f0', marginBottom: '5px' }}>
            Connectez-vous pour émettre des diplômes
          </p>
          <p style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '15px' }}>
            Certifié sur <strong style={{ color: '#22c55e' }}>Hedera Hashgraph</strong>
          </p>
          <a href="/" style={{ color: 'white', marginTop: '10px', display: 'inline-block' }}>
            ← Retour à l'accueil
          </a>
        </div>

        {/* Formulaire de login */}
        <form onSubmit={handleSubmit} style={{
          background: 'white',
          borderRadius: '15px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          
          <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '24px', textAlign: 'center' }}>
            🔐 Connexion
          </h2>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
              Email de l'université
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '8px',
                border: '2px solid #e0e0e0',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="admin@universite.bf"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '8px',
                border: '2px solid #e0e0e0',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>

          {/* Erreur */}
          {error && (
            <div style={{
              background: '#fee',
              border: '2px solid #f00',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px',
              color: '#c00',
              textAlign: 'center'
            }}>
              ❌ {error}
            </div>
          )}

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #2e3e50 0%, #1a1f2e 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(46, 62, 80, 0.4)'
            }}
          >
            {loading ? '⏳ Connexion...' : '🔓 Se connecter'}
          </button>

          {/* Badge Hedera */}
          <div style={{
            marginTop: '20px',
            padding: '12px',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '8px',
            textAlign: 'center',
            color: 'white',
            fontSize: '13px',
            fontWeight: 'bold'
          }}>
            ⛓️ Powered by Hedera Hashgraph Network
          </div>

          {/* Info */}
          <div style={{
            marginTop: '20px',
            padding: '20px',
            background: '#f0f9ff',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#2e3e50'
          }}>
            <h3 style={{ marginBottom: '10px', fontSize: '16px', color: '#2e3e50' }}>
              🧪 Comptes de test
            </h3>
            <div style={{ lineHeight: '1.8' }}>
              <strong>Université de Ouagadougou</strong><br/>
              Email: admin@univ-ouaga.bf<br/>
              Mot de passe: ouaga2025
              <br/><br/>
              <strong>UCAD Dakar</strong><br/>
              Email: admin@ucad.sn<br/>
              Mot de passe: ucad2025
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;