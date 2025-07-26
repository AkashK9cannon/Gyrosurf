const { Menu, nativeImage, BrowserWindow, MenuItem, ShareMenu, } = require('electron');
const { join } = require('path');

function OpenAppMenu(e, coords, parentWindow) { // Renamed parent to parentWindow for clarity
  const items = {
        "New Tab": {
          icon: "../sysMedia/icons/New_Tab.png",
          fn: () => {
            ipcMain.emit('CreateTab', e); // Emit the IPC event to create a new tab
          },
        },
        Print: {
          icon: "../sysMedia/icons/Print.png",
          fn: () => { console.log("Print clicked"); },
        },
        Bookmarks: {
          icon: "../sysMedia/iconsC/Star.png",
          fn: () => { console.log("Bookmarks clicked"); },
        },
        History: {
          icon: "../sysMedia/icons/History.png",
          fn: () => { console.log("History clicked"); },
        },
        Downloads: {
          icon: "../sysMedia/icons/Downloads.png",
          fn: () => { console.log("Downloads clicked"); },
        },
        Extensions: {
          icon: "../sysMedia/icons/Extension.png",
          fn: () => { console.log("Extensions clicked"); },
        }
      };
    
      const template = []
      Object.keys(items).forEach(i => {
        const iconPath = join(__dirname, items[i].icon); // Adjust path if OpenAppMenu.js is in Comtext
        const image = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
        template.push({
          label: `${i}                `,
          icon: image,
          click: items[i].fn,
          id: i,
          enabled: true,
        })
      });
      const M = new MenuItem({
        icon: '',
        id: '',
        sublabel: '>',
        
      })
      
      const menu = Menu.buildFromTemplate(template);
      menu.popup({
        window: BrowserWindow.fromWebContents(e.sender),
      });
}

function OpenContextMenu(){
    var a = new MenuItem({})
}

module.exports = OpenAppMenu;
