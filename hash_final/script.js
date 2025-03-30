document.addEventListener('DOMContentLoaded', () => {
    // Encryption Elements
    const messageInput = document.getElementById('messageInput');
    const encryptBtn = document.getElementById('encryptBtn');
    const encryptedOutput = document.getElementById('encryptedOutput');
    const keyOutput = document.getElementById('keyOutput');
    const copyEncrypted = document.getElementById('copyEncrypted');
    const copyKey = document.getElementById('copyKey');

    // Decryption Elements
    const encryptedInput = document.getElementById('encryptedInput');
    const keyInput = document.getElementById('keyInput');
    const decryptBtn = document.getElementById('decryptBtn');
    const decryptedOutput = document.getElementById('decryptedOutput');
    const copyDecrypted = document.getElementById('copyDecrypted');

    // Generate a random key
    function generateKey() {
        return CryptoJS.lib.WordArray.random(16).toString();
    }

    // Encrypt message
    encryptBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (!message) {
            alert('Please enter a message to encrypt');
            return;
        }

        // Generate a random key
        const key = generateKey();
        
        // Encrypt using AES
        const encrypted = CryptoJS.AES.encrypt(message, key).toString();
        
        // Display results
        encryptedOutput.textContent = encrypted;
        keyOutput.textContent = key;
    });

    // Decrypt message
    decryptBtn.addEventListener('click', () => {
        const encrypted = encryptedInput.value.trim();
        const key = keyInput.value.trim();

        if (!encrypted || !key) {
            alert('Please provide both the encrypted message and the key');
            return;
        }

        try {
            // Decrypt using AES
            const decrypted = CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
            
            if (!decrypted) {
                throw new Error('Invalid key or corrupted message');
            }
            
            decryptedOutput.textContent = decrypted;
        } catch (error) {
            alert('Decryption failed. Please check your key and try again.');
            console.error(error);
        }
    });

    // Copy buttons
    copyEncrypted.addEventListener('click', () => {
        copyToClipboard(encryptedOutput);
    });

    copyKey.addEventListener('click', () => {
        copyToClipboard(keyOutput);
    });

    copyDecrypted.addEventListener('click', () => {
        copyToClipboard(decryptedOutput);
    });

    function copyToClipboard(element) {
        const text = element.textContent;
        if (!text) {
            alert('Nothing to copy');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => alert('Copied to clipboard!'))
            .catch(err => {
                console.error('Failed to copy:', err);
                alert('Failed to copy text');
            });
    }
});