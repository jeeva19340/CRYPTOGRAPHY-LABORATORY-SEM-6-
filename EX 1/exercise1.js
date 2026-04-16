<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cryptography Lab</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            height: 100vh;
            background: #f5f5f5;
        }

        .sidebar {
            width: 250px;
            background: #2c3e50;
            color: white;
            padding: 20px 0;
        }

        .sidebar h2 {
            padding: 0 20px 20px;
            border-bottom: 1px solid #34495e;
            margin-bottom: 20px;
        }

        .menu-item {
            padding: 15px 20px;
            cursor: pointer;
            transition: background 0.3s;
            border-left: 3px solid transparent;
        }

        .menu-item:hover {
            background: #34495e;
        }

        .menu-item.active {
            background: #34495e;
            border-left: 3px solid #3498db;
        }

        .main-content {
            flex: 1;
            padding: 40px;
            overflow-y: auto;
        }

        .cipher-section {
            display: none;
            background: white;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .cipher-section.active {
            display: block;
        }

        .cipher-section h1 {
            margin-bottom: 30px;
            color: #2c3e50;
        }

        .operation-buttons {
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
        }

        .op-btn {
            padding: 12px 30px;
            border: 2px solid #3498db;
            background: white;
            color: #3498db;
            cursor: pointer;
            border-radius: 5px;
            font-size: 16px;
            transition: all 0.3s;
        }

        .op-btn.active,
        .op-btn:hover {
            background: #3498db;
            color: white;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #2c3e50;
            font-weight: 600;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
            font-family: inherit;
        }

        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }

        .submit-btn {
            padding: 12px 40px;
            background: #27ae60;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .submit-btn:hover {
            background: #229954;
        }

        .result-box {
            margin-top: 30px;
            padding: 20px;
            background: #ecf0f1;
            border-radius: 5px;
            border-left: 4px solid #3498db;
        }

        .result-box h3 {
            margin-bottom: 10px;
            color: #2c3e50;
        }

        .result-box p {
            color: #555;
            word-break: break-all;
            font-size: 16px;
        }

        .operation-form {
            display: none;
        }

        .operation-form.active {
            display: block;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <h2>Cryptography Lab</h2>
        <div class="menu-item active" onclick="showCipher('shift')">Shift Cipher</div>
        <div class="menu-item" onclick="showCipher('hill')">Hill Cipher</div>
        <div class="menu-item" onclick="showCipher('playfair')">Playfair Cipher</div>
        <div class="menu-item" onclick="showCipher('euclidean')">Euclidean's Algorithm</div>
        <div class="menu-item" onclick="showCipher('gcd')">GCD (Normal Method)</div>
        <div class="menu-item" onclick="showCipher('millerrabin')">Miller-Rabin Test</div>
    </div>

    <div class="main-content">
        <!-- Shift Cipher Section -->
        <div id="shift-cipher" class="cipher-section active">
            <h1>Shift Cipher</h1>
            
            <div class="operation-buttons">
                <button class="op-btn active" onclick="showOperation('shift', 'encrypt')">Encryption</button>
                <button class="op-btn" onclick="showOperation('shift', 'decrypt')">Decryption</button>
            </div>

            <!-- Encryption Form -->
            <div id="shift-encrypt-form" class="operation-form active">
                <div class="form-group">
                    <label>Plain Text:</label>
                    <textarea id="shift-encrypt-plain" placeholder="Enter plain text"></textarea>
                </div>
                <div class="form-group">
                    <label>Key (0-25):</label>
                    <input type="number" id="shift-encrypt-key" min="0" max="25" value="6" placeholder="Enter key">
                </div>
                <button class="submit-btn" onclick="shiftEncrypt()">Encrypt</button>
                <div id="shift-encrypt-result" style="display:none" class="result-box">
                    <h3>Cipher Text:</h3>
                    <p id="shift-encrypt-output"></p>
                </div>
            </div>

            <!-- Decryption Form -->
            <div id="shift-decrypt-form" class="operation-form">
                <div class="form-group">
                    <label>Cipher Text:</label>
                    <textarea id="shift-decrypt-cipher" placeholder="Enter cipher text"></textarea>
                </div>
                <div class="form-group">
                    <label>Key (0-25):</label>
                    <input type="number" id="shift-decrypt-key" min="0" max="25" value="6" placeholder="Enter key">
                </div>
                <button class="submit-btn" onclick="shiftDecrypt()">Decrypt</button>
                <div id="shift-decrypt-result" style="display:none" class="result-box">
                    <h3>Plain Text:</h3>
                    <p id="shift-decrypt-output"></p>
                </div>
            </div>
        </div>

        <!-- Hill Cipher Section -->
        <div id="hill-cipher" class="cipher-section">
            <h1>Hill Cipher</h1>
            
            <div class="operation-buttons">
                <button class="op-btn active" onclick="showOperation('hill', 'encrypt')">Encryption</button>
                <button class="op-btn" onclick="showOperation('hill', 'decrypt')">Decryption</button>
            </div>

            <!-- Encryption Form -->
            <div id="hill-encrypt-form" class="operation-form active">
                <div class="form-group">
                    <label>Plain Text:</label>
                    <textarea id="hill-encrypt-plain" placeholder="Enter plain text"></textarea>
                </div>
                <div class="form-group">
                    <label>Key Matrix (3x3, comma-separated rows):</label>
                    <input type="text" id="hill-key-row1" placeholder="Row 1: e.g., 17,17,5" value="17,17,5">
                    <input type="text" id="hill-key-row2" placeholder="Row 2: e.g., 21,18,21" value="21,18,21" style="margin-top:5px">
                    <input type="text" id="hill-key-row3" placeholder="Row 3: e.g., 2,2,19" value="2,2,19" style="margin-top:5px">
                </div>
                <button class="submit-btn" onclick="hillEncrypt()">Encrypt</button>
                <div id="hill-encrypt-result" style="display:none" class="result-box">
                    <h3>Cipher Text:</h3>
                    <p id="hill-encrypt-output"></p>
                </div>
            </div>

            <!-- Decryption Form -->
            <div id="hill-decrypt-form" class="operation-form">
                <div class="form-group">
                    <label>Cipher Text:</label>
                    <textarea id="hill-decrypt-cipher" placeholder="Enter cipher text"></textarea>
                </div>
                <div class="form-group">
                    <label>Key Matrix (3x3, comma-separated rows):</label>
                    <input type="text" id="hill-decrypt-row1" placeholder="Row 1: e.g., 17,17,5" value="17,17,5">
                    <input type="text" id="hill-decrypt-row2" placeholder="Row 2: e.g., 21,18,21" value="21,18,21" style="margin-top:5px">
                    <input type="text" id="hill-decrypt-row3" placeholder="Row 3: e.g., 2,2,19" value="2,2,19" style="margin-top:5px">
                </div>
                <button class="submit-btn" onclick="hillDecrypt()">Decrypt</button>
                <div id="hill-decrypt-result" style="display:none" class="result-box">
                    <h3>Plain Text:</h3>
                    <p id="hill-decrypt-output"></p>
                </div>
            </div>
        </div>

        <!-- Playfair Cipher Section -->
        <div id="playfair-cipher" class="cipher-section">
            <h1>Playfair Cipher</h1>
            
            <div class="operation-buttons">
                <button class="op-btn active" onclick="showOperation('playfair', 'encrypt')">Encryption</button>
                <button class="op-btn" onclick="showOperation('playfair', 'decrypt')">Decryption</button>
            </div>

            <!-- Encryption Form -->
            <div id="playfair-encrypt-form" class="operation-form active">
                <div class="form-group">
                    <label>Plain Text:</label>
                    <textarea id="playfair-encrypt-plain" placeholder="Enter plain text"></textarea>
                </div>
                <div class="form-group">
                    <label>Key:</label>
                    <input type="text" id="playfair-encrypt-key" placeholder="Enter key" value="monarchy">
                </div>
                <button class="submit-btn" onclick="playfairEncrypt()">Encrypt</button>
                <div id="playfair-encrypt-result" style="display:none" class="result-box">
                    <h3>Cipher Text:</h3>
                    <p id="playfair-encrypt-output"></p>
                </div>
            </div>

            <!-- Decryption Form -->
            <div id="playfair-decrypt-form" class="operation-form">
                <div class="form-group">
                    <label>Cipher Text:</label>
                    <textarea id="playfair-decrypt-cipher" placeholder="Enter cipher text"></textarea>
                </div>
                <div class="form-group">
                    <label>Key:</label>
                    <input type="text" id="playfair-decrypt-key" placeholder="Enter key" value="monarchy">
                </div>
                <button class="submit-btn" onclick="playfairDecrypt()">Decrypt</button>
                <div id="playfair-decrypt-result" style="display:none" class="result-box">
                    <h3>Plain Text:</h3>
                    <p id="playfair-decrypt-output"></p>
                </div>
            </div>
        </div>

        <!-- Euclidean's Algorithm Section -->
        <div id="euclidean-cipher" class="cipher-section">
            <h1>Euclidean's Algorithm</h1>
            <p style="margin-bottom: 20px; color: #555;">Find GCD of two numbers using Euclidean's algorithm with step-by-step process.</p>
            
            <div class="form-group">
                <label>First Number (a):</label>
                <input type="number" id="euclidean-a" placeholder="Enter first number" value="48">
            </div>
            <div class="form-group">
                <label>Second Number (b):</label>
                <input type="number" id="euclidean-b" placeholder="Enter second number" value="18">
            </div>
            <button class="submit-btn" onclick="euclideanGCD()">Calculate GCD</button>
            <div id="euclidean-result" style="display:none" class="result-box">
                <h3>Result:</h3>
                <p id="euclidean-output"></p>
                <h3 style="margin-top: 15px;">Steps:</h3>
                <pre id="euclidean-steps" style="white-space: pre-wrap; font-family: monospace; color: #555;"></pre>
            </div>
        </div>

        <!-- GCD Normal Method Section -->
        <div id="gcd-cipher" class="cipher-section">
            <h1>GCD (Normal Method)</h1>
            <p style="margin-bottom: 20px; color: #555;">Find GCD by finding all divisors and taking the greatest common one.</p>
            
            <div class="form-group">
                <label>First Number (a):</label>
                <input type="number" id="gcd-a" placeholder="Enter first number" value="48">
            </div>
            <div class="form-group">
                <label>Second Number (b):</label>
                <input type="number" id="gcd-b" placeholder="Enter second number" value="18">
            </div>
            <button class="submit-btn" onclick="normalGCD()">Calculate GCD</button>
            <div id="gcd-result" style="display:none" class="result-box">
                <h3>Result:</h3>
                <p id="gcd-output"></p>
                <h3 style="margin-top: 15px;">Details:</h3>
                <pre id="gcd-steps" style="white-space: pre-wrap; font-family: monospace; color: #555;"></pre>
            </div>
        </div>

        <!-- Miller-Rabin Primality Test Section -->
        <div id="millerrabin-cipher" class="cipher-section">
            <h1>Miller-Rabin Primality Test</h1>
            <p style="margin-bottom: 20px; color: #555;">Test if a number is prime using the Miller-Rabin probabilistic algorithm.</p>
            
            <div class="form-group">
                <label>Number to Test:</label>
                <input type="number" id="millerrabin-n" placeholder="Enter number" value="97">
            </div>
            <div class="form-group">
                <label>Number of Rounds (k):</label>
                <input type="number" id="millerrabin-k" placeholder="Higher = more accurate" value="5" min="1">
            </div>
            <button class="submit-btn" onclick="millerRabinTest()">Test Primality</button>
            <div id="millerrabin-result" style="display:none" class="result-box">
                <h3>Result:</h3>
                <p id="millerrabin-output"></p>
                <h3 style="margin-top: 15px;">Details:</h3>
                <pre id="millerrabin-steps" style="white-space: pre-wrap; font-family: monospace; color: #555;"></pre>
            </div>
        </div>
    </div>

    <script>
        // Menu Navigation
        function showCipher(cipher) {
            // Update menu
            document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
            event.target.classList.add('active');

            // Update content
            document.querySelectorAll('.cipher-section').forEach(section => section.classList.remove('active'));
            document.getElementById(cipher + '-cipher').classList.add('active');
        }

        function showOperation(cipher, operation) {
            // Update buttons
            const section = document.getElementById(cipher + '-cipher');
            section.querySelectorAll('.op-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            // Update forms
            section.querySelectorAll('.operation-form').forEach(form => form.classList.remove('active'));
            document.getElementById(cipher + '-' + operation + '-form').classList.add('active');
        }

        // ============ SHIFT CIPHER ============
        function shiftEncrypt() {
            const plain = document.getElementById('shift-encrypt-plain').value.toLowerCase();
            const key = parseInt(document.getElementById('shift-encrypt-key').value);
            
            let cipher = '';
            for (let char of plain) {
                if (char >= 'a' && char <= 'z') {
                    const num = char.charCodeAt(0) - 97;
                    const shifted = (num + key) % 26;
                    cipher += String.fromCharCode(shifted + 97);
                } else {
                    cipher += char;
                }
            }
            
            document.getElementById('shift-encrypt-output').textContent = cipher.toUpperCase();
            document.getElementById('shift-encrypt-result').style.display = 'block';
        }

        function shiftDecrypt() {
            const cipher = document.getElementById('shift-decrypt-cipher').value.toLowerCase();
            const key = parseInt(document.getElementById('shift-decrypt-key').value);
            
            let plain = '';
            for (let char of cipher) {
                if (char >= 'a' && char <= 'z') {
                    const num = char.charCodeAt(0) - 97;
                    const shifted = (num - key + 26) % 26;
                    plain += String.fromCharCode(shifted + 97);
                } else {
                    plain += char;
                }
            }
            
            document.getElementById('shift-decrypt-output').textContent = plain.toLowerCase();
            document.getElementById('shift-decrypt-result').style.display = 'block';
        }

        // ============ HILL CIPHER ============
        function parseKeyMatrix() {
            const row1 = document.getElementById('hill-key-row1').value.split(',').map(x => parseInt(x.trim()));
            const row2 = document.getElementById('hill-key-row2').value.split(',').map(x => parseInt(x.trim()));
            const row3 = document.getElementById('hill-key-row3').value.split(',').map(x => parseInt(x.trim()));
            return [row1, row2, row3];
        }

        function parseDecryptKeyMatrix() {
            const row1 = document.getElementById('hill-decrypt-row1').value.split(',').map(x => parseInt(x.trim()));
            const row2 = document.getElementById('hill-decrypt-row2').value.split(',').map(x => parseInt(x.trim()));
            const row3 = document.getElementById('hill-decrypt-row3').value.split(',').map(x => parseInt(x.trim()));
            return [row1, row2, row3];
        }

        // Vector × Matrix multiplication (not Matrix × Vector)
        // This matches the notebook: [plaintext] × [key matrix]
        function multiplyMatrix(vector, matrix) {
            const result = [];
            for (let j = 0; j < 3; j++) {
                let sum = 0;
                for (let i = 0; i < 3; i++) {
                    sum += vector[i] * matrix[i][j];
                }
                result.push(sum % 26);
            }
            return result;
        }

        function hillEncrypt() {
            let plain = document.getElementById('hill-encrypt-plain').value.toLowerCase().replace(/[^a-z]/g, '');
            const key = parseKeyMatrix();
            
            // Pad if needed
            while (plain.length % 3 !== 0) {
                plain += 'x';
            }
            
            let cipher = '';
            for (let i = 0; i < plain.length; i += 3) {
                const block = [
                    plain.charCodeAt(i) - 97,
                    plain.charCodeAt(i + 1) - 97,
                    plain.charCodeAt(i + 2) - 97
                ];
                // Now: vector × matrix (not matrix × vector)
                const encrypted = multiplyMatrix(block, key);
                cipher += encrypted.map(x => String.fromCharCode(x + 97)).join('');
            }
            
            document.getElementById('hill-encrypt-output').textContent = cipher.toUpperCase();
            document.getElementById('hill-encrypt-result').style.display = 'block';
        }

        // Matrix inverse for Hill cipher decryption
        function modInverse(a, m) {
            a = ((a % m) + m) % m;
            for (let x = 1; x < m; x++) {
                if ((a * x) % m === 1) return x;
            }
            return 1;
        }

        function determinant3x3(matrix) {
            return (
                matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
                matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
                matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
            );
        }

        function adjugate3x3(matrix) {
            return [
                [
                    matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1],
                    -(matrix[0][1] * matrix[2][2] - matrix[0][2] * matrix[2][1]),
                    matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]
                ],
                [
                    -(matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]),
                    matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0],
                    -(matrix[0][0] * matrix[1][2] - matrix[0][2] * matrix[1][0])
                ],
                [
                    matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0],
                    -(matrix[0][0] * matrix[2][1] - matrix[0][1] * matrix[2][0]),
                    matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
                ]
            ];
        }

        function inverseMatrix(matrix) {
            let det = determinant3x3(matrix);
            det = ((det % 26) + 26) % 26;
            const detInv = modInverse(det, 26);
            const adj = adjugate3x3(matrix);
            
            return adj.map(row => 
                row.map(val => ((val * detInv) % 26 + 26) % 26)
            );
        }

        function hillDecrypt() {
            let cipher = document.getElementById('hill-decrypt-cipher').value.toLowerCase().replace(/[^a-z]/g, '');
            const key = parseDecryptKeyMatrix();
            const keyInv = inverseMatrix(key);
            
            let plain = '';
            for (let i = 0; i < cipher.length; i += 3) {
                const block = [
                    cipher.charCodeAt(i) - 97,
                    cipher.charCodeAt(i + 1) - 97,
                    cipher.charCodeAt(i + 2) - 97
                ];
                // Now: vector × inverse matrix (not inverse matrix × vector)
                const decrypted = multiplyMatrix(block, keyInv);
                plain += decrypted.map(x => String.fromCharCode(x + 97)).join('');
            }
            
            document.getElementById('hill-decrypt-output').textContent = plain.toLowerCase();
            document.getElementById('hill-decrypt-result').style.display = 'block';
        }

        // ============ PLAYFAIR CIPHER ============
        const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('');

        function removeSpaces(str) {
            return str.replace(/\s/g, '');
        }

        function generateKeyTable(key) {
            key = removeSpaces(key.toLowerCase());
            const hash = Array(26).fill(0);
            
            for (let char of key) {
                if (char !== 'j') {
                    hash[alpha.indexOf(char)] = 2;
                }
            }
            hash[alpha.indexOf('j')] = 1;
            
            const keyT = Array.from({ length: 5 }, () => Array(5));
            let i = 0, j = 0;
            
            for (let char of key) {
                const idx = alpha.indexOf(char);
                if (hash[idx] === 2) {
                    hash[idx] = 1;
                    keyT[i][j++] = char;
                    if (j === 5) { i++; j = 0; }
                }
            }
            
            for (let k = 0; k < 26; k++) {
                if (hash[k] === 0) {
                    keyT[i][j++] = alpha[k];
                    if (j === 5) { i++; j = 0; }
                }
            }
            
            return keyT;
        }

        function search(keyT, a, b) {
            if (a === 'j') a = 'i';
            if (b === 'j') b = 'i';
            
            const arr = Array(4);
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (keyT[i][j] === a) {
                        arr[0] = i;
                        arr[1] = j;
                    } else if (keyT[i][j] === b) {
                        arr[2] = i;
                        arr[3] = j;
                    }
                }
            }
            return arr;
        }

        function prepareText(str) {
            if (str.length % 2 !== 0) str += 'z';
            return str;
        }

        function playfairEncrypt() {
            const key = document.getElementById('playfair-encrypt-key').value;
            let str = removeSpaces(document.getElementById('playfair-encrypt-plain').value.toLowerCase());
            str = prepareText(str);
            
            const keyT = generateKeyTable(key);
            let result = str.split('');
            
            for (let i = 0; i < str.length; i += 2) {
                const arr = search(keyT, result[i], result[i + 1]);
                
                if (arr[0] === arr[2]) {
                    result[i] = keyT[arr[0]][(arr[1] + 1) % 5];
                    result[i + 1] = keyT[arr[0]][(arr[3] + 1) % 5];
                } else if (arr[1] === arr[3]) {
                    result[i] = keyT[(arr[0] + 1) % 5][arr[1]];
                    result[i + 1] = keyT[(arr[2] + 1) % 5][arr[1]];
                } else {
                    result[i] = keyT[arr[0]][arr[3]];
                    result[i + 1] = keyT[arr[2]][arr[1]];
                }
            }
            
            document.getElementById('playfair-encrypt-output').textContent = result.join('').toUpperCase();
            document.getElementById('playfair-encrypt-result').style.display = 'block';
        }

        function playfairDecrypt() {
            const key = document.getElementById('playfair-decrypt-key').value;
            let str = removeSpaces(document.getElementById('playfair-decrypt-cipher').value.toLowerCase());
            
            const keyT = generateKeyTable(key);
            let result = str.split('');
            
            for (let i = 0; i < str.length; i += 2) {
                const arr = search(keyT, result[i], result[i + 1]);
                
                if (arr[0] === arr[2]) {
                    result[i] = keyT[arr[0]][(arr[1] - 1 + 5) % 5];
                    result[i + 1] = keyT[arr[0]][(arr[3] - 1 + 5) % 5];
                } else if (arr[1] === arr[3]) {
                    result[i] = keyT[(arr[0] - 1 + 5) % 5][arr[1]];
                    result[i + 1] = keyT[(arr[2] - 1 + 5) % 5][arr[1]];
                } else {
                    result[i] = keyT[arr[0]][arr[3]];
                    result[i + 1] = keyT[arr[2]][arr[1]];
                }
            }
            
            document.getElementById('playfair-decrypt-output').textContent = result.join('').toLowerCase();
            document.getElementById('playfair-decrypt-result').style.display = 'block';
        }

        // ============ EUCLIDEAN'S ALGORITHM ============
        function euclideanGCD() {
            let a = parseInt(document.getElementById('euclidean-a').value);
            let b = parseInt(document.getElementById('euclidean-b').value);
            
            if (a < 0 || b < 0) {
                alert('Please enter positive numbers');
                return;
            }
            
            const originalA = a;
            const originalB = b;
            let steps = `Finding GCD of ${a} and ${b} using Euclidean's Algorithm:\n\n`;
            
            while (b !== 0) {
                const quotient = Math.floor(a / b);
                const remainder = a % b;
                steps += `${a} = ${b} × ${quotient} + ${remainder}\n`;
                a = b;
                b = remainder;
            }
            
            steps += `\nGCD(${originalA}, ${originalB}) = ${a}`;
            
            document.getElementById('euclidean-output').textContent = `GCD = ${a}`;
            document.getElementById('euclidean-steps').textContent = steps;
            document.getElementById('euclidean-result').style.display = 'block';
        }

        // ============ GCD NORMAL METHOD ============
        function normalGCD() {
            const a = parseInt(document.getElementById('gcd-a').value);
            const b = parseInt(document.getElementById('gcd-b').value);
            
            if (a < 0 || b < 0) {
                alert('Please enter positive numbers');
                return;
            }
            
            // Find divisors of a
            const divisorsA = [];
            for (let i = 1; i <= a; i++) {
                if (a % i === 0) {
                    divisorsA.push(i);
                }
            }
            
            // Find divisors of b
            const divisorsB = [];
            for (let i = 1; i <= b; i++) {
                if (b % i === 0) {
                    divisorsB.push(i);
                }
            }
            
            // Find common divisors
            const commonDivisors = divisorsA.filter(x => divisorsB.includes(x));
            
            // Get the greatest common divisor
            const gcd = Math.max(...commonDivisors);
            
            let steps = `Finding GCD of ${a} and ${b}:\n\n`;
            steps += `Divisors of ${a}: ${divisorsA.join(', ')}\n\n`;
            steps += `Divisors of ${b}: ${divisorsB.join(', ')}\n\n`;
            steps += `Common divisors: ${commonDivisors.join(', ')}\n\n`;
            steps += `Greatest Common Divisor = ${gcd}`;
            
            document.getElementById('gcd-output').textContent = `GCD = ${gcd}`;
            document.getElementById('gcd-steps').textContent = steps;
            document.getElementById('gcd-result').style.display = 'block';
        }

        // ============ MILLER-RABIN PRIMALITY TEST ============
        function modPow(base, exp, mod) {
            let result = 1;
            base = base % mod;
            while (exp > 0) {
                if (exp % 2 === 1) {
                    result = (result * base) % mod;
                }
                exp = Math.floor(exp / 2);
                base = (base * base) % mod;
            }
            return result;
        }

        function millerRabinTest() {
            const n = parseInt(document.getElementById('millerrabin-n').value);
            const k = parseInt(document.getElementById('millerrabin-k').value);
            
            if (n < 2) {
                document.getElementById('millerrabin-output').textContent = `${n} is NOT prime`;
                document.getElementById('millerrabin-steps').textContent = 'Numbers less than 2 are not prime.';
                document.getElementById('millerrabin-result').style.display = 'block';
                return;
            }
            
            if (n === 2 || n === 3) {
                document.getElementById('millerrabin-output').textContent = `${n} is PRIME`;
                document.getElementById('millerrabin-steps').textContent = '2 and 3 are prime numbers.';
                document.getElementById('millerrabin-result').style.display = 'block';
                return;
            }
            
            if (n % 2 === 0) {
                document.getElementById('millerrabin-output').textContent = `${n} is NOT prime`;
                document.getElementById('millerrabin-steps').textContent = 'Even numbers (except 2) are not prime.';
                document.getElementById('millerrabin-result').style.display = 'block';
                return;
            }
            
            // Write n-1 as 2^r * d
            let d = n - 1;
            let r = 0;
            while (d % 2 === 0) {
                d /= 2;
                r++;
            }
            
            let steps = `Testing primality of ${n} using Miller-Rabin algorithm:\n\n`;
            steps += `n - 1 = ${n - 1} = 2^${r} × ${d}\n`;
            steps += `Running ${k} rounds of testing...\n\n`;
            
            // Witness loop
            let isProbablyPrime = true;
            for (let i = 0; i < k; i++) {
                // Pick a random witness a in [2, n-2]
                const a = Math.floor(Math.random() * (n - 3)) + 2;
                
                let x = modPow(a, d, n);
                steps += `Round ${i + 1}: a = ${a}\n`;
                steps += `  x = ${a}^${d} mod ${n} = ${x}\n`;
                
                if (x === 1 || x === n - 1) {
                    steps += `  → Continue (witness inconclusive)\n\n`;
                    continue;
                }
                
                let continueOuter = false;
                for (let j = 0; j < r - 1; j++) {
                    x = (x * x) % n;
                    if (x === n - 1) {
                        steps += `  x = x^2 mod ${n} = ${x}\n`;
                        steps += `  → Continue (witness inconclusive)\n\n`;
                        continueOuter = true;
                        break;
                    }
                }
                
                if (continueOuter) continue;
                
                steps += `  → ${n} is COMPOSITE (witness found)\n`;
                isProbablyPrime = false;
                break;
            }
            
            if (isProbablyPrime) {
                steps += `\nConclusion: ${n} is PROBABLY PRIME`;
                steps += `\n(Probability of error: ${Math.pow(0.25, k).toExponential(2)})`;
                document.getElementById('millerrabin-output').textContent = `${n} is PROBABLY PRIME`;
            } else {
                steps += `\nConclusion: ${n} is DEFINITELY COMPOSITE`;
                document.getElementById('millerrabin-output').textContent = `${n} is COMPOSITE (NOT PRIME)`;
            }
            
            document.getElementById('millerrabin-steps').textContent = steps;
            document.getElementById('millerrabin-result').style.display = 'block';
        }
    </script>
</body>
</html>
