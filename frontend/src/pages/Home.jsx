import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#2c3e50',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 60px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '36px' }}>🎓</span>
          <div>
            <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>DiploChain</div>
            <div style={{ color: '#f39c12', fontSize: '16px' }}>Africa</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', borderBottom: '2px solid #f39c12', paddingBottom: '5px' }}>Home</Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Universités</Link>
          <Link to="/verify" style={{ color: 'white', textDecoration: 'none' }}>Vérification</Link>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#f39c12',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '24px'
          }}>🔍</div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '60px',
        gap: '60px',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Left Side - Content */}
        <div>
          <h1 style={{
            fontSize: '56px',
            margin: '0 0 20px 0',
            lineHeight: '1.2'
          }}>
            <span style={{ color: '#f39c12' }}>Certifiez Vos Diplômes</span>
            <br />
            <span style={{ color: 'white' }}>sur la Blockchain</span>
          </h1>
          
          <p style={{
            color: '#bdc3c7',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '40px'
          }}>
            DiploChain Africa utilise la technologie Hedera Hashgraph pour garantir 
            l'authenticité et l'infalsifiabilité de vos diplômes académiques. 
            Une solution sécurisée, rapide et transparente pour les universités africaines.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={{
                background: '#f39c12',
                color: 'white',
                border: 'none',
                padding: '15px 40px',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                Émettre un Diplôme ▶
              </button>
            </Link>
            
            <Link to="/verify" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '15px 40px',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Vérifier un Diplôme
              </button>
            </Link>
          </div>

          {/* Decorative Icons */}
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '2px solid #f39c12',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>🚀</div>
            <div style={{
              width: '60px',
              height: '60px',
              border: '2px solid #f39c12',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>💬</div>
            <div style={{
              width: '60px',
              height: '60px',
              border: '2px solid #f39c12',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>🎯</div>
          </div>
        </div>

        {/* Right Side - Visual Element */}
        <div style={{ position: 'relative', height: '600px' }}>
          {/* Large Yellow Blob */}
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: '#f39c12',
            borderRadius: '50% 50% 0 50%',
            bottom: '0',
            right: '0',
            zIndex: 1
          }}></div>

          {/* Blue Curved Line */}
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            border: '3px solid #3498db',
            borderRadius: '50%',
            top: '-100px',
            right: '-50px',
            zIndex: 2
          }}></div>

          {/* Diploma Card Image Placeholder */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '450px',
            background: 'white',
            borderRadius: '50% 50% 50% 0',
            top: '80px',
            right: '100px',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            overflow: 'hidden'
          }}>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>📜</div>
              <div style={{ color: '#2c3e50', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                Diplôme Certifié
              </div>
              <div style={{ color: '#7f8c8d', fontSize: '14px', marginBottom: '20px' }}>
                Blockchain Hedera
              </div>
              <div style={{
                background: '#f39c12',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '20px',
                display: 'inline-block',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                ✓ Vérifié
              </div>
            </div>
          </div>

          {/* Small Rocket Icon */}
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '100px',
            fontSize: '40px',
            zIndex: 4,
            animation: 'float 3s ease-in-out infinite'
          }}>🚀</div>

          {/* Target Icon */}
          <div style={{
            position: 'absolute',
            bottom: '100px',
            right: '50px',
            fontSize: '60px',
            zIndex: 4
          }}>🎯</div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px'
      }}>
        <div style={{ width: '40px', height: '4px', background: '#7f8c8d', borderRadius: '2px' }}></div>
        <div style={{ width: '60px', height: '4px', background: '#f39c12', borderRadius: '2px' }}></div>
        <div style={{ width: '40px', height: '4px', background: '#7f8c8d', borderRadius: '2px' }}></div>
      </div>

      {/* Footer Text */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '60px',
        color: '#7f8c8d',
        fontSize: '12px'
      }}>
        Powered by Hedera Hashgraph • Hedera Africa Hackathon 2025
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </div>
  );
}

export default Home;