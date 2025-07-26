const {ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld('GyroSearch', {
    OpenSearchWindow: () => ipcRenderer.send('OpenSearchWindow')
})