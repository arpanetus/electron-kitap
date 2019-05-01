const electron = require('electron');
const crypto = require('crypto');

const {getKitap} = require('./utils/get-kitap');
const {parseLink} = require('./utils/link-parser');
const {pathToSave} = require('./utils/path-to-save');
const {listOfBooks} = require('./utils/list-books');
const {bookAddChannel, mainToWebChannel, mainFromWebChannel} = require('./utils/channels');



const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

let window = null;

const createWindow = async () => {

    window = new BrowserWindow({
        darkTheme: true,
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
    });

    window.loadURL(`file://${__dirname}/face/index.html`);
    window.webContents.openDevTools({mode: 'bottom'});
    window.on('closed', () => {
        window = null
    })


};

ipcMain.on(mainFromWebChannel, async (event, arg) => {
    console.log(arg);
    const list = await listOfBooks();
    event.sender.send(mainToWebChannel, list)
});

ipcMain.on(bookAddChannel, async (event, arg) => {
    const parsedLink = await parseLink(arg);
    getKitap(parsedLink, pathToSave + crypto.createHash('md5').update(parsedLink).digest("hex").slice(0,7)+'.epub', () => {});
    event.sender.send(mainToWebChannel, await listOfBooks());
});


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (window === null) {
        createWindow()
    }
});
