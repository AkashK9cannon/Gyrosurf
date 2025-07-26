const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(`gyrosurf`, {
  CreateTab: (id, url) => ipcRenderer.send("CreateTab", id, url),
  CloseTab: (id) => ipcRenderer.send('CloseTab', id),
  ShowTab: (id) => {ipcRenderer.send('ShowTab', id)},
  // SwitchLeftTab: () => ipcRenderer,
  // SwitchRightTab: () => ipcRenderer,
  OpenAppMenu: (x, y) => ipcRenderer.send("OpenAppMenu", x, y),
  CloseApp: () => ipcRenderer.send("CloseApp"),

  Reply: (channel,callback) => {
    ipcRenderer.once(channel, (event, data) => callback(data));
  },
});

// window.addEventListener('keydown', (e) => {
//   if (e.ctrlKey && e.key.toLowerCase() === 't') {
//     window.electronAPI.TriggerNewTab(); // calls main process
//   }
// });
