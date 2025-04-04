const generateRandomPassword = () => {
    const uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // excluding I and O
    const lowercaseChars = 'abcdefghijkmnopqrstuvwxyz'; // excluding l
    const numberChars = '23456789'; // excluding 0 and 1
    const specialChars = '!@#$%^&*()_+-={}[]|:;<>,.?';
    
    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
    
    // Ensure at least one character from each category
    let password = '';
    password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    
    // Fill up the rest of the password
    for (let i = 4; i < 12; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    // Shuffle the password (Fisher-Yates algorithm)
    const passwordArray = password.split('');
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }
    
    return passwordArray.join('');
};

module.exports = { generateRandomPassword };