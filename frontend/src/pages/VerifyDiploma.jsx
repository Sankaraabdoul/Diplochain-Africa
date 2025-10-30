import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyDiploma() {
  const { serialNumber } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [manualSerial, setManualSerial] = useState('');

  useEffect(() => {
    if (serialNumber) {
      verifyDiploma(serialNumber);
    }
  }, [serialNumber]);

  const verifyDiploma = async (serial) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/diplomas/verify/${serial}`);
      setResult(response.data);
      console.log('✅ Vérification:', response.data);
    } catch (err) {
      setError(err.response?.data || { message: err.message, valid: false });
      console.error('❌ Erreur vérification:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualVerify = (e) => {
    e.preventDefault();
    if (manualSerial.trim()) {
      navigate(`/verify/${manualSerial.trim()}`);
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
            ✅ Vérifier un Diplôme
          </h1>
          <p style={{ fontSize: '18px', color: '#f0f0f0' }}>
            Vérifiez l'authenticité d'un diplôme sur la blockchain Hedera
          </p>
          <a href="/" style={{ color: 'white', marginTop: '10px', display: 'inline-block' }}>
            ← Retour à l'accueil
          </a>
        </div>

        {/* Formulaire de recherche - TOUJOURS VISIBLE */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          marginBottom: '30px'
        }}>
          <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '24px', textAlign: 'center' }}>
            🔍 Entrez le numéro de série
          </h2>
          <form onSubmit={handleManualVerify}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={manualSerial}
                onChange={(e) => setManualSerial(e.target.value)}
                placeholder="Ex: 4"
                style={{
                  flex: 1,
                  padding: '15px',
                  borderRadius: '8px',
                  border: '2px solid #e0e0e0',
                  fontSize: '18px',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="submit"
                disabled={!manualSerial.trim()}
                style={{
                  padding: '15px 30px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: manualSerial.trim() ? 'linear-gradient(135deg, #2e3e50 0%, #764ba2 100%)' : '#ccc',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: manualSerial.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Vérifier
              </button>
            </div>
          </form>
          
          {/* Info */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#f0f9ff',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#2e3e50'
          }}>
            💡 <strong>Astuce :</strong> Vous pouvez scanner le QR Code du diplôme ou entrer manuellement le numéro de série.
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '60px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>⏳</div>
            <h2 style={{ color: '#2e3e50', fontSize: '24px' }}>
              Vérification en cours...
            </h2>
            <p style={{ color: '#666', marginTop: '10px' }}>
              Interrogation de la blockchain Hedera
            </p>
          </div>
        )}

        {/* Résultat : Diplôme AUTHENTIQUE */}
        {result && result.valid && result.diploma && !loading && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '100px', marginBottom: '20px' }}>✅</div>
            <h2 style={{
              color: '#10b981',
              fontSize: '36px',
              marginBottom: '10px',
              background: '#d1fae5',
              padding: '15px',
              borderRadius: '10px',
              display: 'inline-block'
            }}>
              DIPLÔME AUTHENTIQUE
            </h2>
            <p style={{ color: '#059669', fontSize: '18px', marginBottom: '30px' }}>
              Ce diplôme est vérifié et certifié sur la blockchain Hedera
            </p>

            {/* Informations du diplôme */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #10b981',
              borderRadius: '10px',
              padding: '30px',
              textAlign: 'left',
              marginBottom: '30px'
            }}>
              <h3 style={{ color: '#065f46', marginBottom: '20px', fontSize: '22px' }}>
                📋 Informations du diplôme
              </h3>
              
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <strong style={{ color: '#065f46' }}>Serial Number:</strong>
                  <span style={{ marginLeft: '10px', color: '#667eea', fontSize: '20px', fontWeight: 'bold' }}>
                    #{result.diploma.serialNumber}
                  </span>
                </div>
                
                {result.diploma.student && (
                  <>
                    <div>
                      <strong style={{ color: '#065f46' }}>Étudiant:</strong>
                      <span style={{ marginLeft: '10px' }}>{result.diploma.student.fullName}</span>
                    </div>
                    
                    <div>
                      <strong style={{ color: '#065f46' }}>Email:</strong>
                      <span style={{ marginLeft: '10px' }}>{result.diploma.student.email}</span>
                    </div>
                  </>
                )}
                
                {result.diploma.diploma && (
                  <>
                    <div>
                      <strong style={{ color: '#065f46' }}>Diplôme:</strong>
                      <span style={{ marginLeft: '10px' }}>
                        {result.diploma.diploma.type} en {result.diploma.diploma.field}
                      </span>
                    </div>
                    
                    {result.diploma.diploma.specialization && (
                      <div>
                        <strong style={{ color: '#065f46' }}>Spécialisation:</strong>
                        <span style={{ marginLeft: '10px' }}>{result.diploma.diploma.specialization}</span>
                      </div>
                    )}
                    
                    {result.diploma.diploma.mention && (
                      <div>
                        <strong style={{ color: '#065f46' }}>Mention:</strong>
                        <span style={{ marginLeft: '10px' }}>{result.diploma.diploma.mention}</span>
                      </div>
                    )}
                  </>
                )}
                
                {result.diploma.university && (
                  <div>
                    <strong style={{ color: '#065f46' }}>Université:</strong>
                    <span style={{ marginLeft: '10px' }}>
                      {result.diploma.university.name}, {result.diploma.university.country}
                    </span>
                  </div>
                )}
                
                {result.diploma.issuedAt && (
                  <div>
                    <strong style={{ color: '#065f46' }}>Date d'émission:</strong>
                    <span style={{ marginLeft: '10px' }}>
                      {new Date(result.diploma.issuedAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                )}
              </div>

              {/* Hash PDF */}
              {result.diploma.pdfHash && (
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #d1fae5' }}>
                  <strong style={{ color: '#065f46' }}>📄 Fichier PDF:</strong>
                  <span style={{ marginLeft: '10px' }}>{result.diploma.pdfFileName}</span>
                  <div style={{ marginTop: '10px' }}>
                    <strong style={{ color: '#065f46', fontSize: '14px' }}>Hash SHA-256:</strong>
                    <code style={{
                      display: 'block',
                      marginTop: '5px',
                      padding: '10px',
                      background: 'white',
                      borderRadius: '5px',
                      fontSize: '12px',
                      wordBreak: 'break-all',
                      color: '#666'
                    }}>
                      {result.diploma.pdfHash}
                    </code>
                  </div>
                </div>
              )}
            </div>

            {/* Blockchain Info */}
            {result.hedera && (
              <div style={{
                background: '#eff6ff',
                border: '2px solid #2e3e50',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'left',
                marginBottom: '30px'
              }}>
                <h3 style={{ color: '#2e3e50', marginBottom: '15px', fontSize: '18px' }}>
                  🔗 Informations Blockchain
                </h3>
                
                <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
                  {result.hedera.owner && (
                    <div>
                      <strong style={{ color: '#2e3e50' }}>Propriétaire:</strong>
                      <span style={{ marginLeft: '10px', fontFamily: 'monospace' }}>
                        {result.hedera.owner}
                      </span>
                    </div>
                  )}
                  
                  {result.hedera.explorerUrl && (
                    <div>
                      <strong style={{ color: '#2e3e50' }}>Transaction:</strong>
                      <a 
                        href={result.hedera.explorerUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ marginLeft: '10px', color: '#2e3e50', wordBreak: 'break-all' }}
                      >
                        Voir sur Hedera Explorer →
                      </a>
                    </div>
                  )}
                  
                  {result.hedera.tokenUrl && (
                    <div>
                      <strong style={{ color: '#2e3e50' }}>Token:</strong>
                      <a 
                        href={result.hedera.tokenUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ marginLeft: '10px', color: '#3b82f6', wordBreak: 'break-all' }}
                      >
                        Voir le NFT →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Boutons */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setResult(null);
                  setError(null);
                  setManualSerial('');
                }}
                style={{
                  padding: '12px 30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Vérifier un autre diplôme
              </button>
              <a href="/" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '12px 30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#2e3e50',
                  background: 'white',
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>
                  Retour à l'accueil
                </button>
              </a>
            </div>
          </div>
        )}

        {/* Résultat : Diplôme FRAUDULEUX ou INTROUVABLE */}
        {(error || (result && !result.valid)) && !loading && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '100px', marginBottom: '20px' }}>❌</div>
            <h2 style={{
              color: '#ef4444',
              fontSize: '36px',
              marginBottom: '10px',
              background: '#fee2e2',
              padding: '15px',
              borderRadius: '10px',
              display: 'inline-block'
            }}>
              {serialNumber ? 'DIPLÔME FRAUDULEUX' : 'DIPLÔME NON TROUVÉ'}
            </h2>
            <p style={{ color: '#dc2626', fontSize: '18px', marginBottom: '30px' }}>
              {error?.message || result?.message || 'Ce diplôme n\'existe pas sur la blockchain'}
            </p>

            <div style={{
              background: '#fef2f2',
              border: '2px solid #ef4444',
              borderRadius: '10px',
              padding: '30px',
              textAlign: 'left',
              marginBottom: '30px'
            }}>
              <h3 style={{ color: '#991b1b', marginBottom: '15px' }}>
                ⚠️ ATTENTION
              </h3>
              <ul style={{ color: '#991b1b', lineHeight: '1.8', paddingLeft: '20px', margin: 0 }}>
                <li>Ce diplôme n'est pas enregistré sur la blockchain Hedera</li>
                <li>Il peut s'agir d'un faux document</li>
                <li>Vérifiez auprès de l'université émettrice</li>
                <li>Signalez tout document frauduleux aux autorités</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setResult(null);
                  setError(null);
                  setManualSerial('');
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
                Vérifier un autre diplôme
              </button>
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

export default VerifyDiploma;