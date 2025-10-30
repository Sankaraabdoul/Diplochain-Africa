const {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  Hbar,
} = require("@hashgraph/sdk");
const fs = require('fs');

async function setupHedera() {
  console.log(" Setting up Hedera Testnet accounts...\n");
  
  // Pour le testnet, vous pouvez créer un compte gratuit sur
  // https://portal.hedera.com/register
  
  console.log(" Instructions:");
  console.log("1. Allez sur https://portal.hedera.com/register");
  console.log("2. Créez un compte testnet gratuit");
  console.log("3. Copiez votre Account ID et Private Key");
  console.log("4. Collez-les dans backend/.env\n");
  
  console.log("Format dans .env:");
  console.log("HEDERA_ACCOUNT_ID=0.0.XXXXX");
  console.log("HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...");
  
  console.log("\n Une fois fait, exécutez: node scripts/create-token.js");
}

setupHedera().catch(console.error);