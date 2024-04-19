const { ipcRenderer } = require('electron');
document.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('run-node-function');
});
ipcRenderer.on('node-id', (event, data) => {
    const combinedUint8Array = data.reduce((acc, base64String) => {
        const uint8Array = new Uint8Array(Buffer.from(base64String, 'base64'));
        return new Uint8Array([...acc, ...uint8Array]);
    }, new Uint8Array());
    const blob = new Blob([combinedUint8Array], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const viewer = document.createElement('embed');
    viewer.src = blobUrl;
    viewer.style.width = '100%';
    viewer.style.height = '100vh';
    document.body.innerHTML = '';
    document.body.appendChild(viewer);
});
