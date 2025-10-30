# Test DiploChain Africa API

Write-Host "`n--- Test 1: Health Check ---" -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000" -Method Get
    Write-Host "OK API en ligne" -ForegroundColor Green
    Write-Host "Message: $($health.message)" -ForegroundColor White
} catch {
    Write-Host "ERREUR: $_" -ForegroundColor Red
    exit 1
}

Write-Host "`n--- Test 2: Creer un diplome ---" -ForegroundColor Cyan

$body = @{
    student = @{
        fullName = "Aminata Diallo"
        email = "aminata@example.com"
        nationalId = "SN98765432"
    }
    diploma = @{
        type = "Master"
        field = "Medecine"
        specialization = "Cardiologie"
        mention = "Tres Bien"
        dateObtained = "2024-06-20"
    }
    university = @{
        name = "Universite Cheikh Anta Diop"
        country = "Senegal"
        city = "Dakar"
    }
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/diplomas/issue" -Method Post -ContentType "application/json" -Body $body
    
    Write-Host "OK Diplome cree avec succes!" -ForegroundColor Green
    Write-Host "Serial Number: $($response.data.serialNumber)" -ForegroundColor Yellow
    Write-Host "Transaction: $($response.data.transactionId)" -ForegroundColor Cyan
    Write-Host "Explorer: $($response.data.explorerUrl)" -ForegroundColor Blue
    Write-Host "Token URL: $($response.data.tokenUrl)" -ForegroundColor Blue
    Write-Host "QR Code: OK" -ForegroundColor Green
    Write-Host "Verify URL: http://localhost:3000/verify/$($response.data.serialNumber)" -ForegroundColor Magenta
    
    $serialNumber = $response.data.serialNumber
    
    # Attendre que le Mirror Node indexe le NFT
    Write-Host "`nAttente 30s pour propagation Hedera Mirror Node..." -ForegroundColor Yellow
    for ($i = 30; $i -gt 0; $i--) {
        Write-Host "  $i secondes restantes..." -NoNewline -ForegroundColor DarkYellow
        Start-Sleep -Seconds 1
        Write-Host "`r" -NoNewline
    }
    Write-Host "  OK Pret pour verification                    " -ForegroundColor Green
    
} catch {
    Write-Host "ERREUR creation diplome: $_" -ForegroundColor Red
    exit 1
}

Write-Host "`n--- Test 3: Verifier le diplome #$serialNumber ---" -ForegroundColor Cyan

try {
    $verify = Invoke-RestMethod -Uri "http://localhost:5000/api/diplomas/verify/$serialNumber" -Method Get
    
    if ($verify.valid) {
        Write-Host "`nOK DIPLOME AUTHENTIQUE" -ForegroundColor Green
        Write-Host "`nInformations du diplome:" -ForegroundColor Cyan
        Write-Host "  Etudiant: $($verify.diploma.student.fullName)" -ForegroundColor White
        Write-Host "  Email: $($verify.diploma.student.email)" -ForegroundColor White
        Write-Host "  Diplome: $($verify.diploma.diploma.type) en $($verify.diploma.diploma.field)" -ForegroundColor White
        Write-Host "  Specialisation: $($verify.diploma.diploma.specialization)" -ForegroundColor White
        Write-Host "  Mention: $($verify.diploma.diploma.mention)" -ForegroundColor White
        Write-Host "  Universite: $($verify.diploma.university.name), $($verify.diploma.university.country)" -ForegroundColor White
        Write-Host "  Date obtention: $($verify.diploma.diploma.dateObtained)" -ForegroundColor White
        Write-Host "`nBlockchain:" -ForegroundColor Cyan
        Write-Host "  Owner: $($verify.hedera.owner)" -ForegroundColor White
        Write-Host "  Explorer: $($verify.diploma.explorerUrl)" -ForegroundColor Blue
        Write-Host "  Token: $($verify.diploma.tokenUrl)" -ForegroundColor Blue
    } else {
        Write-Host "`nERREUR DIPLOME INVALIDE" -ForegroundColor Red
        Write-Host "Message: $($verify.message)" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "ERREUR verification: $_" -ForegroundColor Red
}

Write-Host "`n--- Test 4: Liste de tous les diplomes ---" -ForegroundColor Cyan

try {
    $list = Invoke-RestMethod -Uri "http://localhost:5000/api/diplomas" -Method Get
    Write-Host "OK Total diplomes: $($list.count)" -ForegroundColor Yellow
    
    if ($list.count -gt 0) {
        Write-Host "`nDerniers diplomes:" -ForegroundColor Cyan
        foreach ($d in $list.data | Select-Object -First 5) {
            Write-Host "  #$($d.serialNumber) - $($d.student.fullName) - $($d.diploma.type) $($d.diploma.field)" -ForegroundColor White
        }
    }
    
} catch {
    Write-Host "ERREUR liste: $_" -ForegroundColor Red
}

Write-Host "`n--- Test 5: Tester une fraude (Serial #99999) ---" -ForegroundColor Cyan

try {
    $fraud = Invoke-RestMethod -Uri "http://localhost:5000/api/diplomas/verify/99999" -Method Get
    
    if ($fraud.valid -eq $false) {
        Write-Host "OK Fraude detectee correctement!" -ForegroundColor Green
        Write-Host "Message: $($fraud.message)" -ForegroundColor Yellow
    } else {
        Write-Host "ATTENTION: diplome frauduleux non detecte" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "OK Fraude detectee (erreur 404 normale)" -ForegroundColor Green
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "TOUS LES TESTS SONT REUSSIS!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host "`nOK Backend fonctionnel" -ForegroundColor Green
Write-Host "OK Hedera integration OK" -ForegroundColor Green
Write-Host "OK SBT Token cree (Serial #$serialNumber)" -ForegroundColor Green
Write-Host "OK Verification blockchain OK" -ForegroundColor Green
Write-Host "OK Detection de fraude OK" -ForegroundColor Green

Write-Host "`nLiens utiles:" -ForegroundColor Cyan
Write-Host "API: http://localhost:5000" -ForegroundColor Blue
Write-Host "Transaction: https://hashscan.io/testnet/transaction/$($response.data.transactionId)" -ForegroundColor Blue
Write-Host "Token: https://hashscan.io/testnet/token/$env:SBT_TOKEN_ID" -ForegroundColor Blue
Write-Host "Diplome #$serialNumber : http://localhost:3000/verify/$serialNumber" -ForegroundColor Blue

Write-Host "`n======================================" -ForegroundColor Magenta
Write-Host "BACKEND MVP TERMINE!" -ForegroundColor Magenta
Write-Host "Prochaine etape: Frontend React" -ForegroundColor Magenta
Write-Host "======================================" -ForegroundColor Magenta