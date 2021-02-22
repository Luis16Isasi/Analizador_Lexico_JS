const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let appWindow;

function crearVentana() {
    appWindow = new BrowserWindow({
        
        // deshabilitar para que el usuario no pueda cambiarle el tamaño deifnido
        resizable: true,
        minWidth: 700,
        width: 1000,
        maxWidth: 1000,
        minHeight:800,
        maxHeight: 1000,
        center: true,
        show: false,
        icon: 'javascript.png',
        webPreferences: {
            nodeIntegration: true,
        },
    });
    // crearVentana.loadFile('index.html');
    // crearVentana.webContents.openDevTools();
    // cargar HTML
    appWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '/index.html')}`
    );

    //cargar HTML
    // appWindow.loadFile('./index.html');

    //cuando la aplicacion es cerrada
    appWindow.on('closed', () => {
        appWindow = null;
    });

    //cuando la app este lista, mostrar la ventana
    appWindow.once('ready-to-show', () => {
        appWindow.show();
    });
}
//usamos esto para el archivo ejecutable
app.whenReady().then(crearVentana);

// app.on('ready', crearVentana);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        crearVentana();
    }
});
