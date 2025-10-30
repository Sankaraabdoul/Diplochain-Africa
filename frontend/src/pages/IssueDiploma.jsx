import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QRCodeCanvas as QRCode } from 'qrcode.react';

function IssueDiploma() {
  const navigate = useNavigate();
  const [university, setUniversity] = useState(null);
  
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    studentId: '',
    diplomaType: 'Licence',
    field: '',
    specialization: '',
    mention: 'Assez Bien',
    dateObtained: '',
    universityName: '',
    country: '',
    city: ''
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // VÉRIFIER L'AUTHENTIFICATION
  useEffect(() => {
    const session = localStorage.getItem('university_session');
    const universityData = localStorage.getItem('university_data');
    
    if (!session || !universityData) {
      navigate('/login');
      return;
    }
    
    // Vérifier que la session est valide
    axios.post('http://localhost:5000/api/auth/verify', { sessionId: session })
      .then(response => {
        const uni = response.data.data.university;
        setUniversity(uni);
        
        // Pré-remplir les champs de l'université
        setFormData(prev => ({
          ...prev,
          universityName: uni.name,
          country: uni.country,
          city: uni.city
        }));
      })
      .catch(error => {
        console.error('Session invalide:', error);
        localStorage.removeItem('university_session');
        localStorage.removeItem('university_data');
        navigate('/login');
      });
  }, [navigate]);

  // Afficher un loader si pas encore chargé
  if (!university) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2e3e50 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '60px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>⏳</div>
          <h2 style={{ color: '#2e3e50', fontSize: '24px' }}>
            Vérification de la session...
          </h2>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setError(null);
    } else {
      setError('Veuillez sélectionner un fichier PDF valide');
      setPdfFile(null);
    }
  };

  const generatePdfHash = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        resolve(hashHex);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!pdfFile) {
      setError('Veuillez télécharger le diplôme PDF');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const pdfHash = await generatePdfHash(pdfFile);
      console.log('📄 PDF Hash:', pdfHash);

      const pdfBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result.split(',')[1]);
        reader.readAsDataURL(pdfFile);
      });

      const response = await axios.post('http://localhost:5000/api/diplomas/issue', {
        student: {
          fullName: formData.studentName,
          email: formData.studentEmail,
          nationalId: formData.studentId
        },
        diploma: {
          type: formData.diplomaType,
          field: formData.field,
          specialization: formData.specialization,
          mention: formData.mention,
          dateObtained: formData.dateObtained
        },
        university: {
          name: formData.universityName,
          country: formData.country,
          city: formData.city
        },
        pdfHash: pdfHash,
        pdfData: pdfBase64,
        pdfFileName: pdfFile.name
      });

      setResult({
        ...response.data.data,
        pdfHash: pdfHash,
        pdfFileName: pdfFile.name
      });
      console.log('✅ Diplôme créé:', response.data);
      
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      console.error('❌ Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    const session = localStorage.getItem('university_session');
    
    if (session) {
      axios.post('http://localhost:5000/api/auth/logout', { sessionId: session })
        .then(() => {
          localStorage.removeItem('university_session');
          localStorage.removeItem('university_data');
          navigate('/login');
        })
        .catch(error => {
          console.error('Erreur logout:', error);
          localStorage.removeItem('university_session');
          localStorage.removeItem('university_data');
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '42px', color: 'white', marginBottom: '10px' }}>
            🏛️ Émettre un Diplôme
          </h1>
          <p style={{ fontSize: '18px', color: '#f0f0f0' }}>
            Connecté en tant que : <strong>{university.name}</strong>
          </p>
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: 'white' }}>
              ← Accueil
            </a>
            <span style={{ color: 'white' }}>•</span>
            <a href="/dashboard" style={{ color: 'white' }}>
              📊 Dashboard
            </a>
            <span style={{ color: 'white' }}>•</span>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '16px',
                padding: 0
              }}
            >
              🔓 Déconnexion
            </button>
          </div>
        </div>

        {/* Formulaire */}
        {!result && (
          <form onSubmit={handleSubmit} style={{
            background: 'white',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            
            {/* Section Upload PDF */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              border: '2px dashed #f59e0b',
              borderRadius: '10px',
              padding: '30px',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '60px', marginBottom: '15px' }}>📄</div>
              <h2 style={{ color: '#92400e', marginBottom: '15px', fontSize: '22px' }}>
                Téléchargez le Diplôme PDF
              </h2>
              <p style={{ color: '#78350f', marginBottom: '20px', fontSize: '14px' }}>
                Le document original sera hashé et vérifié sur la blockchain
              </p>
              
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
                style={{
                  display: 'block',
                  margin: '0 auto 15px',
                  padding: '10px',
                  border: '2px solid #f59e0b',
                  borderRadius: '8px',
                  background: 'white',
                  cursor: 'pointer'
                }}
              />

              {pdfFile && (
                <div style={{
                  background: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  marginTop: '15px'
                }}>
                  <p style={{ color: '#10b981', fontWeight: 'bold' }}>
                    ✅ Fichier sélectionné: {pdfFile.name}
                  </p>
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    Taille: {(pdfFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}
            </div>

            {/* Section Étudiant */}
            <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>
              👤 Informations Étudiant
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                Nom complet *
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e0e0e0',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="Ex: Jean Kouassi"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="studentEmail"
                  value={formData.studentEmail}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="jean@example.com"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                  ID National
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="BF12345678"
                />
              </div>
            </div>

            <hr style={{ margin: '30px 0', border: 'none', borderTop: '2px solid #f0f0f0' }} />

            {/* Section Diplôme */}
            <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>
              🎓 Informations Diplôme
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                  Type de diplôme *
                </label>
                <select
                  name="diplomaType"
                  value={formData.diplomaType}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Licence">Licence</option>
                  <option value="Master">Master</option>
                  <option value="Doctorat">Doctorat</option>
                  <option value="Certificate">Certificat</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                  Mention
                </label>
                <select
                  name="mention"
                  value={formData.mention}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Passable">Passable</option>
                  <option value="Assez Bien">Assez Bien</option>
                  <option value="Bien">Bien</option>
                  <option value="Très Bien">Très Bien</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                Domaine d'étude *
              </label>
              <input
                type="text"
                name="field"
                value={formData.field}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e0e0e0',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="Ex: Informatique, Médecine, Droit..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                  Spécialisation
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Ex: Intelligence Artificielle"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                  Date d'obtention *
                </label>
                <input
                  type="date"
                  name="dateObtained"
                  value={formData.dateObtained}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <hr style={{ margin: '30px 0', border: 'none', borderTop: '2px solid #f0f0f0' }} />

            {/* Section Université - PRÉ-REMPLIE */}
            <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>
              🏛️ Informations Université
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                Nom de l'université *
              </label>
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                required
                readOnly
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e0e0e0',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  background: '#f9fafb',
                  cursor: 'not-allowed'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                  Pays *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  readOnly
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    background: '#f9fafb',
                    cursor: 'not-allowed'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                  Ville
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    background: '#f9fafb',
                    cursor: 'not-allowed'
                  }}
                />
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div style={{
                background: '#fee',
                border: '2px solid #f00',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '20px',
                color: '#c00'
              }}>
                ❌ <strong>Erreur:</strong> {error}
              </div>
            )}

            {/* Bouton Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
            >
              {loading ? '⏳ Création en cours... (Hash du PDF + Blockchain)' : '🚀 Créer le Diplôme sur Blockchain'}
            </button>
          </form>
        )}

        {/* Résultat */}
        {result && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>✅</div>
            <h2 style={{ color: '#10b981', fontSize: '32px', marginBottom: '20px' }}>
              Diplôme Créé avec Succès !
            </h2>
            
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #10b981',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '30px',
              textAlign: 'left'
            }}>
              <p style={{ marginBottom: '10px' }}>
                <strong>Serial Number:</strong> <span style={{ color: '#2e3e50', fontSize: '20px' }}>#{result.serialNumber}</span>
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>Étudiant:</strong> {result.student.fullName}
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>Diplôme:</strong> {result.diploma.type} en {result.diploma.field}
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>Université:</strong> {result.university.name}, {result.university.country}
              </p>
              <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #d0d0d0' }} />
              <p style={{ marginBottom: '10px' }}>
                <strong>📄 Fichier PDF:</strong> {result.pdfFileName}
              </p>
              <p style={{ marginBottom: '0', fontSize: '12px', color: '#666', wordBreak: 'break-all' }}>
                <strong>Hash SHA-256:</strong><br/>
                <code style={{ background: '#f0f0f0', padding: '5px', borderRadius: '4px', display: 'block', marginTop: '5px' }}>
                  {result.pdfHash}
                </code>
              </p>
            </div>

            {/* QR Code */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px', color: '#333' }}>QR Code de Vérification</h3>
              <div style={{
                display: 'inline-block',
                padding: '20px',
                background: 'white',
                border: '3px solid #667eea',
                borderRadius: '10px'
              }}>
                <QRCode 
                  value={`http://localhost:3000/verify/${result.serialNumber}`}
                  size={200}
                  level="H"
                />
              </div>
              <p style={{ marginTop: '15px', color: '#666' }}>
                Scannez ce QR code pour vérifier le diplôme
              </p>
            </div>

            {/* Liens */}
            <div style={{ marginBottom: '30px' }}>
              <p style={{ marginBottom: '10px', color: '#666' }}>
                <strong>Lien de vérification:</strong>
              </p>
              <a 
                href={`/verify/${result.serialNumber}`}
                style={{
                  color: '#2e3e50',
                  fontSize: '16px',
                  wordBreak: 'break-all'
                }}
              >
                http://localhost:3000/verify/{result.serialNumber}
              </a>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <p style={{ marginBottom: '10px', color: '#666' }}>
                <strong>Explorer Hedera:</strong>
              </p>
              <a 
                href={result.explorerUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#2e3e50', fontSize: '14px', wordBreak: 'break-all' }}
              >
                {result.explorerUrl}
              </a>
            </div>

            {/* Boutons */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setResult(null);
                  setPdfFile(null);
                  setFormData({
                    studentName: '',
                    studentEmail: '',
                    studentId: '',
                    diplomaType: 'Licence',
                    field: '',
                    specialization: '',
                    mention: 'Assez Bien',
                    dateObtained: '',
                    universityName: university.name,
                    country: university.country,
                    city: university.city
                  });
                }}
                style={{
                  padding: '12px 30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: 'linear-gradient(135deg, #2e3e50 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Créer un autre diplôme
              </button>
              <a href="/dashboard" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '12px 30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#2e3e50',
                  background: 'white',
                  border: '2px solid #2e3e50',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>
                  Voir le Dashboard
                </button>
              </a>
              <a href="/" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '12px 30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#2e3e50',
                  background: 'white',
                  border: '2px solid #2e3e50',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>
                  Retour à l'accueil
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IssueDiploma;