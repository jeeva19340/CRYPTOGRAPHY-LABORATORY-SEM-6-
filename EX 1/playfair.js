function playfairCipher() {
    let text = prompt("Enter message:");
    let key = prompt("Enter key:");
    if (text === null || key === null || text === "" || key === "") return;

    text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");

    let matrix = [];
    let used = "";
    for (let i = 0; i < key.length; i++) {
        if (!used.includes(key[i])) used += key[i];
    }
    for (let i = 0; i < 26; i++) {
        let ch = String.fromCharCode(65 + i);
        if (ch === 'J') continue;
        if (!used.includes(ch)) used += ch;
    }

    let index = 0;
    let matrixDisplay = "<b>5x5 Matrix:</b><br>";
    for (let i = 0; i < 5; i++) {
        matrix[i] = [];
        for (let j = 0; j < 5; j++) {
            matrix[i][j] = used[index++];
            matrixDisplay += matrix[i][j] + " ";
        }
        matrixDisplay += "<br>";
    }

    let prepared = "";
    for (let i = 0; i < text.length; i++) {
        prepared += text[i];
        if (i + 1 < text.length && text[i] === text[i + 1]) prepared += "X";
    }
    if (prepared.length % 2 !== 0) prepared += "X";

    function findPos(char) {
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                if (matrix[r][c] === char) return { r, c };
            }
        }
    }

    // ENCRYPTION
    let encrypted = "";
    let digraphs = "<b>Intermediate Digraphs:</b> ";
    for (let i = 0; i < prepared.length; i += 2) {
        digraphs += prepared[i] + prepared[i+1] + " ";
        let p1 = findPos(prepared[i]);
        let p2 = findPos(prepared[i + 1]);

        if (p1.r === p2.r) {
            encrypted += matrix[p1.r][(p1.c + 1) % 5];
            encrypted += matrix[p2.r][(p2.c + 1) % 5];
        } else if (p1.c === p2.c) {
            encrypted += matrix[(p1.r + 1) % 5][p1.c];
            encrypted += matrix[(p2.r + 1) % 5][p2.c];
        } else {
            encrypted += matrix[p1.r][p2.c];
            encrypted += matrix[p2.r][p1.c];
        }
    }

    // DECRYPTION (Logic remains exactly yours)
    let decrypted = "";
    for (let i = 0; i < encrypted.length; i += 2) {
        let p1 = findPos(encrypted[i]);
        let p2 = findPos(encrypted[i + 1]);
        if (p1.r === p2.r) {
            decrypted += matrix[p1.r][(p1.c + 4) % 5];
            decrypted += matrix[p2.r][(p2.c + 4) % 5];
        } else if (p1.c === p2.c) {
            decrypted += matrix[(p1.r + 4) % 5][p1.c];
            decrypted += matrix[(p2.r + 4) % 5][p2.c];
        } else {
            decrypted += matrix[p1.r][p2.c];
            decrypted += matrix[p2.r][p1.c];
        }
    }

    document.getElementById("result").innerHTML =
        "<b>Playfair Cipher</b><br><br>" +
        matrixDisplay + "<br>" +
        digraphs + "<br><br>" +
        "Encrypted Text: " + encrypted + "<br>" +
        "Decrypted Text: " + decrypted;
}
