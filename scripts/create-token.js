const {
  Client,
  PrivateKey,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  Hbar,
} = require("@hashgraph/sdk");
require('dotenv').config({ path: './backend/.env' });
const fs = require('fs');

async function createSBTToken() {
  try {
    // Vérifier que les credentials existent
    if (!process.env.HEDERA_ACCOUNT_ID || !process.env.HEDERA_PRIVATE_KEY) {
      console.error(" Erreur: HEDERA_ACCOUNT_ID et HEDERA_PRIVATE_KEY requis dans .env");
      process.exit(1);
    }

    const client = Client.forTestnet();
    const operatorId = process.env.HEDERA_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);
    
    client.setOperator(operatorId, operatorKey);
    
    console.log("Création du token SBT DiploChain...\n");
    
    // Créer le token NFT
    const transaction = await new TokenCreateTransaction()
      .setTokenName("DiploChain Academic SBT")
      .setTokenSymbol("DIPLOME")
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(operatorId)
      .setSupplyType(TokenSupplyType.Infinite)
      .setSupplyKey(operatorKey)
      .setAdminKey(operatorKey)
      .setTokenMemo("Soulbound Academic Credentials - Non-transferable")
      .freezeWith(client);
    
    const signTx = await transaction.sign(operatorKey);
    const txResponse = await signTx.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const tokenId = receipt.tokenId;
    
    console.log(" Token SBT créé avec succès!");
    console.log(`Token ID: ${tokenId}`);
    console.log(`Explorer: https://hashscan.io/testnet/token/${tokenId}\n`);
    
    // Sauvegarder dans .env
    const envPath = './backend/.env';
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(/SBT_TOKEN_ID=.*/, `SBT_TOKEN_ID=${tokenId}`);
    fs.writeFileSync(envPath, envContent);
    
    console.log(" Token ID sauvegardé dans backend/.env");
    console.log("\n Setup Hedera terminé! Vous pouvez maintenant développer le backend.");
    
    client.close();
    
  } catch (error) {
    console.error(" Erreur:", error.message);
    process.exit(1);
  }
}

createSBTToken();