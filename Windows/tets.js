const {BrowserWindow, Menu, MenuItem} = require('electron')


function name(params) {
    var Meni = new Menu()
    var M = new MenuItem({
        label: "settings",
        icon: '',
        click: ''
    })
    Menu.buildFromTemplate([M])
}