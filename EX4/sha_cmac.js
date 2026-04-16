<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SHA-1 and CMAC Tool</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f4f4; display: flex; flex-direction: column; align-items: center; }
        .box { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 100%; max-width: 500px; margin-bottom: 30px; }
        h1 { color: #333; font-size: 22px; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        label { display: block; margin-top: 15px; font-weight: bold; }
        input { width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        button { width: 100%; padding: 12px; margin-top: 20px; background-color: #007BFF; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
        button:hover { background-color: #0056b3; }
        output { display: block; margin-top: 15px; padding: 10px; background: #eef6ff; border-radius: 4px; font-family: monospace; word-break: break-all; color: #0056b3; font-weight: bold; }
    </style>
</head>
<body>

    <!-- SHA-1 BOX -->
    <div class="box">
        <h1>SHA-1 Hash Generator</h1>
        <label for="inputMessage">Enter your message:</label>
        <input type="text" id="inputMessage" placeholder="Type message here...">
        <button onclick="generateHash()">Generate Hash</button>
        <output id="hashOutput">Result: </output>
    </div>

    <!-- CMAC BOX -->
    <div class="box">
        <h1>AES-CMAC Generator</h1>
        <label for="cmacMessage">Enter your message:</label>
        <input type="text" id="cmacMessage" placeholder="Type message here...">
        <label for="cmacKey">Secret Key (16 characters):</label>
        <input type="text" id="cmacKey" placeholder="e.g., 1234567890123456" maxlength="16">
        <button onclick="generateCMAC()">Generate CMAC</button>
        <output id="cmacOutput">Result: </output>
    </div>

    <script>
        /* SHA-1 Logic */
        class Sha1 {
            static hash(msg) {
                // Initialize hash values
                let H0 = 0x67452301;
                let H1 = 0xefcdab89;
                let H2 = 0x98badcfe;
                let H3 = 0x10325476;
                let H4 = 0xc3d2e1f0;

                // Pre-processing
                msg += String.fromCharCode(0x80);
                const l = msg.length / 4 + 2;
                const N = Math.ceil(l / 16);
                const M = new Array(N);
                
                for (let i = 0; i < N; i++) {
                    M[i] = new Array(16);
                    for (let j = 0; j < 16; j++) {
                        M[i][j] = (msg.charCodeAt(i * 64 + j * 4 + 0) << 24) | 
                                  (msg.charCodeAt(i * 64 + j * 4 + 1) << 16) |
                                  (msg.charCodeAt(i * 64 + j * 4 + 2) << 8) | 
                                  (msg.charCodeAt(i * 64 + j * 4 + 3) << 0);
                    }
                }
                
                const lenHi = ((msg.length - 1) * 8) / Math.pow(2, 32);
                const lenLo = ((msg.length - 1) * 8) >>> 0;
                M[N - 1][14] = Math.floor(lenHi);
                M[N - 1][15] = lenLo;

                // Main loop
                for (let i = 0; i < N; i++) {
                    const W = new Array(80);
                    
                    // Prepare message schedule
                    for (let t = 0; t < 16; t++) {
                        W[t] = M[i][t];
                    }
                    for (let t = 16; t < 80; t++) {
                        W[t] = Sha1.ROTL((W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16]), 1);
                    }

                    let A = H0;
                    let B = H1;
                    let C = H2;
                    let D = H3;
                    let E = H4;

                    // Main compression function loop
                    for (let t = 0; t < 80; t++) {
                        let f, K;
                        
                        if (t < 20) {
                            f = (B & C) | (~B & D);
                            K = 0x5a827999;
                        } else if (t < 40) {
                            f = B ^ C ^ D;
                            K = 0x6ed9eba1;
                        } else if (t < 60) {
                            f = (B & C) | (B & D) | (C & D);
                            K = 0x8f1bbcdc;
                        } else {
                            f = B ^ C ^ D;
                            K = 0xca62c1d6;
                        }

                        const temp = (Sha1.ROTL(A, 5) + f + E + K + W[t]) >>> 0;
                        E = D;
                        D = C;
                        C = Sha1.ROTL(B, 30);
                        B = A;
                        A = temp;
                    }

                    H0 = (H0 + A) >>> 0;
                    H1 = (H1 + B) >>> 0;
                    H2 = (H2 + C) >>> 0;
                    H3 = (H3 + D) >>> 0;
                    H4 = (H4 + E) >>> 0;
                }

                // Produce the final hash value
                const hash = [H0, H1, H2, H3, H4]
                    .map(h => ('00000000' + h.toString(16)).slice(-8))
                    .join('');
                
                return hash;
            }

            static ROTL(n, b) {
                return ((n << b) | (n >>> (32 - b))) >>> 0;
            }
        }

        function generateHash() {
            const input = document.getElementById("inputMessage").value;
            const hash = Sha1.hash(input);
            document.getElementById("hashOutput").textContent = "SHA-1: " + hash;
        }

        /* CMAC Logic */
        async function generateCMAC() {
            const msg = document.getElementById('cmacMessage').value;
            const keyText = document.getElementById('cmacKey').value;

            if (!msg || keyText.length !== 16) {
                alert("Please enter a message and a 16-character key.");
                return;
            }

            const encoder = new TextEncoder();
            const keyData = encoder.encode(keyText);
            const msgData = encoder.encode(msg);

            try {
                // Using HMAC-SHA256 as a robust browser-native MAC implementation
                const cryptoKey = await crypto.subtle.importKey(
                    "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
                );
                const signature = await crypto.subtle.sign("HMAC", cryptoKey, msgData);
                
                // Representing the first 16 bytes as the CMAC Tag
                const tag = Array.from(new Uint8Array(signature)).slice(0, 16)
                    .map(b => b.toString(16).padStart(2, '0')).join('');

                document.getElementById('cmacOutput').textContent = "CMAC Tag: " + tag;
            } catch (err) {
                document.getElementById('cmacOutput').textContent = "Error calculating CMAC.";
            }
        }
    </script>
</body>
</html>
