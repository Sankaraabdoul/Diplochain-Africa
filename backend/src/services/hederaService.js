const {
  Client,
  PrivateKey,
  TokenMintTransaction,
  TransferTransaction,
  TokenId,
  NftId,
} = require("@hashgraph/sdk");

class HederaService {
  constructor() {
    this.client = Client.forTestnet();
    this.operatorId = process.env.HEDERA_ACCOUNT_ID;
    this.operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);
    this.tokenId = TokenId.fromString(process.env.SBT_TOKEN_ID);
    
    this.client.setOperator(this.operatorId, this.operatorKey);
    console.log(`✅ Hedera Service initialisé (Token: ${this.tokenId})`);
  }
  
  /**
   * Mint un nouveau diplôme SBT avec métadonnées ultra-compactes
   * @param {Object} metadata - Métadonnées du diplôme
   * @returns {Promise<Object>} - {serialNumber, transactionId, explorerUrl, tokenUrl}
   */
  async mintDiplomaSBT(metadata) {
  try {
    // 🔥 MÉTADONNÉES ULTRA-COMPACTES (< 100 bytes)
    const compactMetadata = {
      n: metadata.student.fullName.substring(0, 25),                    // Nom (max 25)
      e: metadata.student.email.split('@')[0].substring(0, 15),         // Email username seulement (max 15)
      t: metadata.diploma.type.charAt(0),                               // Type: L/M/D/C (1 char)
      f: metadata.diploma.field.substring(0, 15),                       // Field (max 15)
      u: metadata.university.name.substring(0, 20),                     // Université (max 20)
    };
    
    const metadataBytes = Buffer.from(JSON.stringify(compactMetadata));
    
    // Vérifier la taille (Hedera limite à 100 bytes)
    if (metadataBytes.length > 100) {
      console.error(`❌ Metadata size: ${metadataBytes.length} bytes`);
      console.error(`Metadata content:`, compactMetadata);
      throw new Error(`Metadata too large: ${metadataBytes.length} bytes (max 100)`);
    }
    
    console.log(`📦 Metadata size: ${metadataBytes.length} bytes`);
    console.log(`📋 Compact metadata:`, compactMetadata);
    
    // Mint du NFT
    const mintTx = await new TokenMintTransaction()
      .setTokenId(this.tokenId)
      .setMetadata([metadataBytes])
      .freezeWith(this.client);
    
    const signTx = await mintTx.sign(this.operatorKey);
    const txResponse = await signTx.execute(this.client);
    const receipt = await txResponse.getReceipt(this.client);
    
    const serialNumber = receipt.serials[0].toNumber();
    const transactionId = txResponse.transactionId.toString();
    
    console.log(`✅ SBT Minted: Serial #${serialNumber}`);
    
    // 🔥 CORRECTION : Construire les URLs correctement
    return {
      serialNumber,
      transactionId: transactionId,
      explorerUrl: `https://hashscan.io/testnet/transaction/${transactionId}`,
      tokenUrl: `https://hashscan.io/testnet/token/${this.tokenId}/${serialNumber}`,
    };
  } catch (error) {
    console.error("❌ Mint error:", error);
    throw error;
  }
}
  
  /**
   * Transférer le SBT à l'étudiant (après signatures)
   * @param {string} studentAccountId - Account ID de l'étudiant
   * @param {number} serialNumber - Serial number du NFT
   */
  async transferSBTToStudent(studentAccountId, serialNumber) {
    try {
      const nftId = new NftId(this.tokenId, serialNumber);
      
      const transferTx = await new TransferTransaction()
        .addNftTransfer(nftId, this.operatorId, studentAccountId)
        .freezeWith(this.client);
      
      const signTx = await transferTx.sign(this.operatorKey);
      const txResponse = await signTx.execute(this.client);
      const receipt = await txResponse.getReceipt(this.client);
      
      console.log(`✅ Transferred SBT #${serialNumber} to ${studentAccountId}`);
      
      return {
        success: true,
        transactionId: txResponse.transactionId.toString(),
      };
    } catch (error) {
      console.error("❌ Transfer error:", error);
      throw error;
    }
  }
  
  /**
   * Vérifier l'authenticité d'un diplôme
   * @param {number} serialNumber - Serial number à vérifier
   * @returns {Promise<Object>} - Informations du diplôme
   */
  async verifyDiploma(serialNumber) {
    try {
      // Query NFT info from Hedera Mirror Node
      const url = `https://testnet.mirrornode.hedera.com/api/v1/tokens/${this.tokenId}/nfts/${serialNumber}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        return { 
          valid: false, 
          error: "Diploma not found on blockchain" 
        };
      }
      
      const data = await response.json();
      
      // Décoder metadata (format ultra-compact)
      const metadataBuffer = Buffer.from(data.metadata, 'base64');
      const compactMetadata = JSON.parse(metadataBuffer.toString());
      
      // Reconstruire les métadonnées complètes
      const fullMetadata = {
        student: {
          fullName: compactMetadata.n,
          email: compactMetadata.e, // Juste le username
        },
        diploma: {
          type: this.expandType(compactMetadata.t),
          field: compactMetadata.f,
        },
        university: {
          name: compactMetadata.u,
        },
      };
      
      return {
        valid: true,
        serialNumber,
        owner: data.account_id,
        metadata: fullMetadata,
        createdAt: data.created_timestamp,
        deleted: data.deleted || false,
      };
    } catch (error) {
      console.error("❌ Verify error:", error);
      return { 
        valid: false, 
        error: error.message 
      };
    }
  }
  
  /**
   * Convertir le type court en type complet
   * @param {string} shortType - L/M/D/C
   * @returns {string} - Licence/Master/Doctorat/Certificate
   */
  expandType(shortType) {
    const types = {
      'L': 'Licence',
      'M': 'Master',
      'D': 'Doctorat',
      'C': 'Certificate',
    };
    return types[shortType] || shortType;
  }
  
  /**
   * Révoquer un diplôme (CAMES only)
   * @param {number} serialNumber - Serial number à révoquer
   */
  async revokeDiploma(serialNumber) {
    try {
      // Note: Pour un vrai système SBT, on utiliserait la wipeKey du CAMES
      // Pour le MVP, on simule juste la révocation dans la DB
      
      console.log(`🔥 Revoking SBT #${serialNumber}`);
      
      return {
        revoked: true,
        serialNumber,
        message: "Diploma revoked (simulation for MVP)",
      };
    } catch (error) {
      console.error("❌ Revoke error:", error);
      throw error;
    }
  }
}

module.exports = new HederaService();