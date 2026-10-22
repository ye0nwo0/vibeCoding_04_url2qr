let qrInstance = null;

function generateQR() {
    const url = document.getElementById('urlInput').value.trim();
    if (!url) {
        document.getElementById('urlInput').focus();
        return;
    }

    const inputSection = document.getElementById('inputSection');
    const inputLabel   = document.getElementById('inputLabel');
    const qrSection    = document.getElementById('qrSection');
    const qrcodeDiv    = document.getElementById('qrcode');

    qrcodeDiv.innerHTML = '';
    qrcodeDiv.onclick   = null;

    qrInstance = new QRCode(qrcodeDiv, {
        text: url,
        width: 260,
        height: 260,
        colorDark: '#1a1a1a',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    inputLabel.classList.add('hidden');
    inputSection.classList.add('moved');
    qrSection.classList.add('visible');

    setTimeout(() => {
        const canvas = qrcodeDiv.querySelector('canvas');
        if (canvas) {
            qrcodeDiv.onclick = () => {
                const link = document.createElement('a');
                link.download = 'qrcode.jpg';
                link.href = canvas.toDataURL('image/jpeg', 1.0);
                link.click();
            };
        }
    }, 150);
}

document.getElementById('urlInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') generateQR();
});
