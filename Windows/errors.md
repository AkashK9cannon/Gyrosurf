function CloseTab(id) {
  console.log("received ", id);
  const a = document.getElementById(id);
  var b = TabStore.findIndex((i) => i.id == id);

  if (TabStore.length === 1 && b !== -1) {
    window.gyrosurf.CloseTab(id);
    window.gyrosurf.MsgFromBackend("ClosedTab", (id) => {
      a.remove(); // or a.parentNode.removeChild(a);
      TabStore.splice(b, 1);
    });

  } else if (TabStore.length > 1 && b !== -1) {
    if (a.classList.contains("show")) {
      let nextTabId = b === 0 ? TabStore[b + 1].id : TabStore[b - 1].id;
      window.gyrosurf.CloseTab(id, nextTabId);

      window.gyrosurf.MsgFromBackend("ClosedTab", (id, set) => {
        const c = document.getElementById(set);
        console.log(c, "ID: ", set);
        a.classList.remove("show");
        a.remove();
        c.classList.remove("hide");
        c.classList.add("show");
        TabStore.splice(b, 1);
      });

    } else if (a.classList.contains("hide")) {
      window.gyrosurf.CloseTab(id);
      window.gyrosurf.MsgFromBackend("ClosedTab", (id) => {
        a.remove();
        TabStore.splice(b, 1);
      });
    }
  }
}

function CloseTab(e, id, show) {
    console.log("Closing Tab: ", id);
    let tabToClose = G_Window.getChildWindows().find(i => i.id == id);

    if (tabToClose && show == null) {
        tabToClose.close();
        e.sender.send("ClosedTab", id);
    } else if (tabToClose && show) {
        tabToClose.close();

        // Refresh the list of tabs after closing
        let updatedTabs = G_Window.getChildWindows();

        updatedTabs.forEach(t => {
            if (t.id != show) {
                t.hide();
            } else {
                t.show();
                e.sender.send("ClosedTab", id, show);
            }
        });
    }
}

received  3
Gyrobar.js:105 null 'ID: ' undefined
VM115 C:\Users\Admin\Desktop\ElwinoidN\System_Apps\Gyrosurf\Windows\AppLoaders\AppLoaders.js:9 Uncaught Error: Cannot read properties of null (reading 'classList')
    at IpcRenderer.<anonymous> (VM115 C:\Users\Admin\Desktop\ElwinoidN\System_Apps\Gyrosurf\Windows\AppLoaders\AppLoaders.js:9:7)
    at IpcRenderer.emit (VM21 node:events:524:28)
    at Object.onMessage (VM111 renderer_init:2:8918)