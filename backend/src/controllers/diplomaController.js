const Diploma = require('../models/Diploma');
const hederaService = require('../services/hederaService');
const QRCode = require('qrcode');

// Variable temporaire en mémoire
let diplomasCache = [];

// @desc    Émettre un nouveau diplôme
// @route   POST /api/diplomas/issue
exports.issueDiploma = async (req, res) => {
  try {
    const { student, diploma, university, pdfHash, pdfData, pdfFileName } = req.body;
    
    // Validation basique
    if (!student?.fullName || !student?.email) {
      return res.status(400).json({
        success: false,
        error: 'Informations étudiant incomplètes'
      });
    }
    
    if (!diploma?.type || !diploma?.field || !diploma?.dateObtained) {
      return res.status(400).json({
        success: false,
        error: 'Informations diplôme incomplètes'
      });
    }

    // Validation du PDF (optionnel mais recommandé)
    if (!pdfHash || !pdfData) {
      console.warn('⚠️ Aucun PDF fourni');
    }
    
    // 1. Créer les métadonnées
    const metadata = {
      student,
      diploma,
      university,
      issuedAt: new Date().toISOString(),
      version: '1.0',
      type: 'Soulbound Academic Credential',
      pdfHash: pdfHash || null,
    };
    
    // 2. Mint le SBT sur Hedera
    console.log('🎓 Minting diploma SBT...');
    const mintResult = await hederaService.mintDiplomaSBT(metadata);
    
    // 3. Générer le QR Code
    const verifyUrl = `${process.env.FRONTEND_URL}/verify/${mintResult.serialNumber}`;
    const qrCode = await QRCode.toDataURL(verifyUrl);
    
    // 4. Sauvegarder dans le cache
    const diplomaDoc = {
      serialNumber: mintResult.serialNumber,
      transactionId: mintResult.transactionId,
      explorerUrl: mintResult.explorerUrl,
      tokenUrl: mintResult.tokenUrl,
      student,
      diploma,
      university,
      qrCode,
      status: 'active',
      createdAt: new Date(),
      pdfHash: pdfHash || null,
      pdfFileName: pdfFileName || null,
      pdfData: pdfData || null,
    };
    
    diplomasCache.push(diplomaDoc);
    
    console.log(`✅ Diploma created: #${mintResult.serialNumber}`);
    if (pdfHash) {
      console.log(`📄 PDF Hash: ${pdfHash}`);
    }
    
    res.status(201).json({
      success: true,
      message: 'Diplôme créé avec succès',
      data: {
        serialNumber: diplomaDoc.serialNumber,
        student: diplomaDoc.student,
        diploma: diplomaDoc.diploma,
        university: diplomaDoc.university,
        qrCode: diplomaDoc.qrCode,
        tokenUrl: mintResult.tokenUrl,
        verifyUrl,
        pdfHash: diplomaDoc.pdfHash,
        pdfFileName: diplomaDoc.pdfFileName,
        explorerUrl: mintResult.explorerUrl,
      },
    });
    
  } catch (error) {
    console.error('❌ Issue diploma error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Vérifier un diplôme
// @route   GET /api/diplomas/verify/:serialNumber
exports.verifyDiploma = async (req, res) => {
  try {
    const { serialNumber } = req.params;
    
    console.log(`🔍 Vérification diplôme #${serialNumber}...`);
    
    // 1. Vérifier sur Hedera
    const hederaResult = await hederaService.verifyDiploma(serialNumber);
    
    if (!hederaResult.valid) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: '❌ DIPLÔME FRAUDULEUX - Non trouvé sur la blockchain',
        alert: 'Ce diplôme n\'existe pas dans le registre CAMES officiel',
      });
    }
    
    // 2. Récupérer les détails du cache
    const diploma = diplomasCache.find(d => d.serialNumber === parseInt(serialNumber));
    
    if (!diploma) {
      return res.json({
        success: true,
        valid: true,
        onChain: true,
        inDatabase: false,
        message: 'Diplôme trouvé sur blockchain mais pas dans notre base',
        hedera: hederaResult,
      });
    }
    
    // 3. Vérifier le statut
    if (diploma.status === 'revoked') {
      return res.json({
        success: true,
        valid: false,
        revoked: true,
        message: '⚠️ DIPLÔME RÉVOQUÉ',
        diploma: {
          serialNumber: diploma.serialNumber,
          student: diploma.student,
          revokedAt: diploma.updatedAt,
        },
      });
    }
    
    // 4. Diplôme valide
    res.json({
      success: true,
      valid: true,
      message: '✅ DIPLÔME AUTHENTIQUE',
      diploma: {
        serialNumber: diploma.serialNumber,
        student: diploma.student,
        diploma: diploma.diploma,
        university: diploma.university,
        issuedAt: diploma.createdAt,
        qrCode: diploma.qrCode,
        pdfHash: diploma.pdfHash,
        pdfFileName: diploma.pdfFileName,
      },
      hedera: {
        owner: hederaResult.owner,
        explorerUrl: diploma.explorerUrl,
        tokenUrl: diploma.tokenUrl,
      },
    });
    
    console.log(`✅ Verification successful: #${serialNumber}`);
    
  } catch (error) {
    console.error('❌ Verify error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Obtenir tous les diplômes
// @route   GET /api/diplomas
exports.getAllDiplomas = async (req, res) => {
  try {
    res.json({
      success: true,
      count: diplomasCache.length,
      data: diplomasCache.map(d => ({
        serialNumber: d.serialNumber,
        student: d.student,
        diploma: d.diploma,
        university: d.university,
        status: d.status,
        createdAt: d.createdAt,
        pdfHash: d.pdfHash,
        pdfFileName: d.pdfFileName,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Obtenir un diplôme par serial number
// @route   GET /api/diplomas/:serialNumber
exports.getDiploma = async (req, res) => {
  try {
    const diploma = diplomasCache.find(
      d => d.serialNumber === parseInt(req.params.serialNumber)
    );
    
    if (!diploma) {
      return res.status(404).json({
        success: false,
        error: 'Diplôme non trouvé',
      });
    }
    
    res.json({
      success: true,
      data: diploma,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};