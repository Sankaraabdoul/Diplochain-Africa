import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

function Dashboard() {
  const [diplomas, setDiplomas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    byCountry: {},
    byType: {},
    recent: []
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDiplomas();
  }, []);

  const loadDiplomas = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      const response = await axios.get('http://localhost:5000/api/diplomas');
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      setDiplomas(data);
      
      const byCountry = {};
      const byType = {};
      
      data.forEach(d => {
        const country = d.university?.country || 'Inconnu';
        byCountry[country] = (byCountry[country] || 0) + 1;
        
        const type = d.diploma?.type || 'Inconnu';
        byType[type] = (byType[type] || 0) + 1;
      });
      
      setStats({
        total: data.length,
        byCountry,
        byType,
        recent: data.slice(-5).reverse()
      });
      
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDiplomas = diplomas.filter(d => 
    d.student?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.student?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.serialNumber?.toString().includes(searchTerm)
  ).slice().reverse();

  const getCountryFlag = (country) => {
    const flags = {
      'Burkina Faso': '🇧🇫', 'Senegal': '🇸🇳', 'Sénégal': '🇸🇳',
      'Cote d\'Ivoire': '🇨🇮', 'Côte d\'Ivoire': '🇨🇮', 'Mali': '🇲🇱',
      'Niger': '🇳🇪', 'Benin': '🇧🇯', 'Bénin': '🇧🇯', 'Togo': '🇹🇬',
      'Ghana': '🇬🇭', 'Nigeria': '🇳🇬'
    };
    return flags[country] || '🌍';
  };

  const Sidebar = () => {
    const location = useLocation();
    const navLinkStyle = (path) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '15px 25px',
      margin: '5px 0',
      borderRadius: '10px',
      color: location.pathname === path ? 'white' : '#bdc3c7',
      background: location.pathname === path ? '#f39c12' : 'transparent',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    });

    return (
      <aside style={{
        width: '280px',
        background: '#34495e',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 20px 30px 20px' }}>
          <span style={{ fontSize: '40px' }}>🎓</span>
          <div>
            <div style={{ color: 'white', fontSize: '22px', fontWeight: 'bold' }}>DiploChain</div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <Link to="/dashboard" style={navLinkStyle('/dashboard')}>
            <span style={{width: '24px', textAlign: 'center'}}>📊</span> Dashboard
          </Link>
          <Link to="/" style={navLinkStyle('/')}>
            <span style={{width: '24px', textAlign: 'center'}}>🏠</span> Accueil
          </Link>
          <Link to="/login" style={navLinkStyle('/login')}>
            <span style={{width: '24px', textAlign: 'center'}}>🏢</span> Universités
          </Link>
          <Link to="/verify" style={navLinkStyle('/verify')}>
            <span style={{width: '24px', textAlign: 'center'}}>🔍</span> Vérification
          </Link>
        </nav>

        <div>
           <Link to="/issue" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                padding: '18px',
                background: '#f39c12',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(243,156,18,0.4)',
                textAlign: 'center'
              }}>
                ➕ Créer un Diplôme
              </button>
            </Link>
        </div>
      </aside>
    );
  };
  
  const StatCard = ({ icon, label, value, color = '#2c3e50' }) => (
    <div style={{
      background: 'white', borderRadius: '15px', padding: '25px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
      transition: 'transform 0.2s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '36px', marginBottom: '15px' }}>{icon}</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: color, marginBottom: '5px' }}>
        {value}
      </div>
      <div style={{ fontSize: '15px', color: '#7f8c8d' }}>{label}</div>
    </div>
  );


  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#2c3e50', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px'
      }}>
        <div style={{ fontSize: '80px' }}>⏳</div>
        <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>
          Chargement des données...
        </h2>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f4f7fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <Sidebar />

      <main style={{
        flex: 1,
        padding: '40px',
        overflowY: 'auto'
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{ color: '#2c3e50', fontSize: '36px', fontWeight: 'bold', margin: 0 }}>
              Tableau de Bord
            </h1>
            <p style={{ color: '#7f8c8d', margin: '5px 0 0 0' }}>
              Bienvenue sur votre espace de gestion DiploChain.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
             <input
                type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un diplôme..."
                style={{
                  width: '300px', padding: '15px 20px', borderRadius: '10px',
                  border: '2px solid #dfe4ea', fontSize: '14px',
                }}
              />
            <button onClick={loadDiplomas} title="Actualiser les données" style={{
                padding: '15px', background: 'white', border: '2px solid #dfe4ea',
                borderRadius: '10px', cursor: 'pointer', fontSize: '18px'
            }}>
                🔄
            </button>
          </div>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
          <StatCard icon="🎓" label="Diplômes Certifiés" value={stats.total} color="#3498db" />
          <StatCard icon="🌍" label="Pays Actifs" value={Object.keys(stats.byCountry).length} color="#e67e22" />
          <StatCard icon="📚" label="Types de Diplômes" value={Object.keys(stats.byType).length} color="#9b59b6" />
          <StatCard icon="🔷" label="Hedera Hashgraph" value="Testnet" color="#2ecc71" />
        </div>
        
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
            gap: '30px',
            alignItems: 'start'
        }}>
            <div style={{
                background: 'white', borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                gridColumn: '1 / span 1'
            }}>
                 <h2 style={{ color: '#2c3e50', padding: '25px 25px 0 25px', fontSize: '22px', fontWeight: '600' }}>
                    Liste complète des Diplômes ({filteredDiplomas.length})
                 </h2>
                 <div style={{ padding: '25px', overflowX: 'auto' }}>
                    {filteredDiplomas.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>
                            <div style={{ fontSize: '60px', marginBottom: '15px' }}>{searchTerm ? '🔍' : '📭'}</div>
                            <p>{searchTerm ? 'Aucun résultat trouvé' : 'Aucun diplôme disponible'}</p>
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #ecf0f1' }}>
                            {['Série', 'Étudiant', 'Diplôme', 'Université', 'Date', ''].map(head => (
                                <th key={head} style={{ padding: '15px', textAlign: 'left', color: '#7f8c8d', fontSize: '13px', textTransform: 'uppercase', fontWeight: '600' }}>{head}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDiplomas.map((d) => (
                            <tr key={d.serialNumber} style={{ borderBottom: '1px solid #ecf0f1' }}>
                                <td style={{ padding: '18px 15px', fontWeight: 'bold', color: '#f39c12' }}>#{d.serialNumber}</td>
                                <td style={{ padding: '18px 15px' }}>
                                    <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{d.student.fullName}</div>
                                    <div style={{ fontSize: '13px', color: '#95a5a6' }}>{d.student.email}</div>
                                </td>
                                <td style={{ padding: '18px 15px' }}>
                                    <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{d.diploma.type}</div>
                                    <div style={{ fontSize: '13px', color: '#95a5a6' }}>{d.diploma.field}</div>
                                </td>
                                <td style={{ padding: '18px 15px' }}>
                                    <div>{getCountryFlag(d.university.country)} {d.university.name}</div>
                                </td>
                                <td style={{ padding: '18px 15px', fontSize: '14px', color: '#7f8c8d' }}>
                                    {new Date(d.createdAt).toLocaleDateString('fr-FR')}
                                </td>
                                <td style={{ padding: '18px 15px' }}>
                                <Link to={`/verify/${d.serialNumber}`} style={{ textDecoration: 'none' }}>
                                    <button style={{
                                        padding: '8px 18px', background: '#34495e', color: 'white',
                                        border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
                                    }}>Vérifier</button>
                                </Link>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    )}
                 </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', gridColumn: '2 / span 1' }}>
                <div style={{
                    background: 'white', borderRadius: '15px', padding: '25px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '22px', fontWeight: '600' }}>⭐ Derniers Ajouts</h2>
                    {stats.recent.length > 0 ? (
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {stats.recent.map(d => (
                                <div key={d.serialNumber} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ background: '#ecf0f1', color: '#f39c12', borderRadius: '8px', width: '45px', height: '45px', display: 'grid', placeItems: 'center', fontSize: '20px' }}>🎓</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{d.student.fullName}</div>
                                        <div style={{ fontSize: '13px', color: '#95a5a6' }}>{d.diploma.type}</div>
                                    </div>
                                    <Link to={`/verify/${d.serialNumber}`} style={{color: '#3498db', textDecoration: 'none', fontWeight: 'bold'}}>Voir</Link>
                                </div>
                            ))}
                        </div>
                    ) : <p style={{ color: '#95a5a6' }}>Aucun diplôme récent.</p>}
                </div>

                <div style={{
                    background: 'white', borderRadius: '15px', padding: '25px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '22px', fontWeight: '600' }}>🌍 Par Pays</h2>
                     {Object.keys(stats.byCountry).length > 0 ? (
                        <div style={{ display: 'grid', gap: '10px' }}>
                            {Object.entries(stats.byCountry).map(([country, count]) => (
                                <div key={country} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', padding: '5px 0' }}>
                                    <span>{getCountryFlag(country)} {country}</span>
                                    <span style={{ fontWeight: 'bold', background: '#ecf0f1', padding: '3px 8px', borderRadius: '5px' }}>{count}</span>
                                </div>
                            ))}
                        </div>
                    ) : <p style={{ color: '#95a5a6' }}>Aucune donnée.</p>}
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;