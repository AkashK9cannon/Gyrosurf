const {BrowserWindow,WebContentsView, webFrame, webFrameMain} = require('electron');
const path = require('path')

function SearchBar(x, y, w, h) {
    var SearchFrame = new WebContentsView({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            devTools: false,
            preload: path.join(__dirname, "../Apploaders/SearchLoader.js"),
            spellcheck: true,
        }
    })
    // var Bar2 = new webFrame({})
    SearchFrame.setBorderRadius(10)
    SearchFrame.setBounds({width: w, height: h, x: x, y: y})
    SearchFrame.setVisible(true)
    SearchFrame.webContents.loadFile(path.join(__dirname, 'SearchFrame.html'))
    return SearchFrame
}

module.exports = SearchBar

