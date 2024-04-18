const { app, BrowserWindow, ipcMain } = require('electron');
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadFile('index.html');
    mainWindow.on('closed', function () {mainWindow = null;});
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {if (process.platform !== 'darwin') {app.quit();}});
app.on('activate', function () {if (mainWindow === null) {createWindow();}});
ipcMain.on('run-node-function', async (event, arg) => {
    const { createNode, nodeFs, obtenerObj } = await import('./helia.mjs');
    const nodeIpfs = await createNode();
    const cid = "bafybeihtjydvepqxrf6r2uncsf5rkpop4xdqnl4vl25zh5gii5ixzd7q54"
    const nodeIpfsFx = await obtenerObj(nodeIpfs, cid);
    var data = [];
    for await (const item of nodeIpfsFx) {
        data.push(Buffer.from(new Uint8Array(item)).toString('base64'));
    }
    console.log(typeof(data))
    event.reply('node-id', data);
});
