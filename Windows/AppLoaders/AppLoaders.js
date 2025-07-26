const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("gyrosurf", {
  CreateTab: () => ipcRenderer.send('CreateTab'),
  CloseTab: (id, show) => ipcRenderer.send('CloseTab', (id, show)),
  CloseApp: () => ipcRenderer.send('CloseApp'),
  MsgFromBackend: (channel, callback) => {
    ipcRenderer.on(channel, (event, data) => {
      callback(data);
    });
  },
});
