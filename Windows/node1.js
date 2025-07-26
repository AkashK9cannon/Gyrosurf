const {
  app,
  BaseWindow,
  screen,
  WebContentsView,
  globalShortcut,
  BrowserWindow,
  ipcMain,
  Menu,
  nativeImage,
  MenuItem,
  ShareMenu,
} = require("electron");
const { join } = require("path");
const OpenAppMenu = require("./Comtext/AppMenu");

function GyrosurfWindow() {
  const { width, height } = screen.getPrimaryDisplay().bounds;
  const G_Window = new BrowserWindow({
    // Changed to BrowserWindow
    width,
    height,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // You might need to adjust preload for the main window if it interacts with Node.js APIs
    },
  });
  var Tabs = G_Window.getChildWindows();

  const AppMenu = new WebContentsView({
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "AppLoaders/TabPreload.js"),
      contextIsolation: true,
      sandbox: false,
      devTools: true,
    },
  });

  AppMenu.webContents.openDevTools();

  AppMenu.setBounds({ x: 0, y: 0, width: width, height: 70 });
  AppMenu.webContents.loadFile(
    join(__dirname, "./AppScripts/Html/Gyrobar.html")
  );

  const AppContents = new WebContentsView({
    webPreferences: {
      preload: join(__dirname, "AppLoaders/SearchLoader.js"),
    },
  });
  AppContents.setBounds({ x: 0, y: 71, width: width, height: height - 70 });
  AppContents.webContents.loadFile(
    join(__dirname, "./AppScripts/Html/Presenter.html")
  );
  AppContents.setBorderRadius(20);
  const AppMedia = new WebContentsView({});

  AppMedia.setBounds({
    x: 50,
    y: 200,
    width: width - 80,
    height: height - 200,
  });
  AppMedia.setBorderRadius(20);
  //   console.log(`AppMedia ID `, AppMedia.webContents.id);
  //   console.log(`AppContent ID`, AppContents.webContents.id);
  AppMedia.webContents.loadURL("https://www.news18.com/");
  if (G_Window.getChildWindows().length == 0) {
    AppContents.setVisible(true);
    AppMedia.setVisible(true);
  } else {
    AppContents.setVisible(false);
    AppMedia.setVisible(false);
  }

  G_Window.contentView.addChildView(AppMenu);
  G_Window.contentView.addChildView(AppContents);
  G_Window.contentView.addChildView(AppMedia);

  ipcMain.on("CreateTab", (e, id, url) => {
    console.log("Create Tab Request");

    const AppTab = new BrowserWindow({
      frame: false,
      skipTaskbar: true,
      width: width,
      height: height - 80,
      x: 5,
      y: 70,
      hasShadow: false,
      parent: G_Window,
      roundedCorners: true,
      thickFrame: false,
      webPreferences: {
        preload: join(__dirname, "Apploaders/AppLoaders.js"),
        nodeIntegration: false,
        nodeIntegrationInSubFrames: false,
        nodeIntegrationInWorker: false,
        contextIsolation: true, // Recommended for security
      },
      resizable: false,
      show: false, // Set to true to show it immediately upon creation
    });
    e.sender.send("CreatedTab", { id: AppTab.id });
    console.log(`Main Process: Sent 'CreatedTab' with ID: ${AppTab.id}`);
    AppTab.loadURL(url ? url : "https://www.google.com");
  });

  ipcMain.on("ShowTab", (e, id) => {
    console.log(`Show Tab req`, id);
    console.log(typeof id);
    const Tabs = G_Window.getChildWindows();
    Tabs.forEach((t) => {
      console.log(typeof t.id);
      if (t.id != id) {
        t.hide();
      } else if (t.id == id) {
        console.log("found id", id);
        t.show();
        console.log("Sending ShowingTab for", id);
        t.webContents.on("did-finish-load", () => {
          e.sender.send("ShowingTab", {
            id,
            Url: t.webContents.getURL(),
            Title: t.webContents.getTitle(),
          });
        });
      }
    });
  });

  function CloseTab(e, id) {
    var a = G_Window.getChildWindows().find((w) => w.id == id);
    var m = "";
    if (a) {
      a.close();
      e.sender.send("ClosedTab", id, (m = "Found"));
    } else if (!a) {
      e.sender.send("ClosedTab", { id, m: "Not Found" });
    }
  }
  ipcMain.on("CloseTab", (e, id) => {
    CloseTab(e, id);
  });

  ipcMain.on("CloseApp", (e, id) => {
    var a = G_Window.getChildWindows();
    a.forEach((c) => c.close());
    CloseApp();
  });

  ipcMain.on("OpenAppMenu", (event, x, y) => {
    var coords = { x, y };
    OpenAppMenu(event, coords, G_Window);
    // console.log(menu.popup[2])
  });

  ipcMain.on("OpenSearchWindow", (e) => {
    var SearchBar = require("./Comtext/SearchBar");

    G_Window.contentView.addChildView(SearchBar(310, 113, 680, 150));
    console.log("Child views:", G_Window.getChildWindows());
  });

  // Shortcut to reload only AppMenu
  globalShortcut.register("Ctrl+R", () => {
    AppMenu.webContents.reload();
  });
}

function CloseApp() {
  if (process.platform != "darwin") {
    app.quit();
  }
}

app.whenReady().then(GyrosurfWindow);

app.on("window-all-closed", () => {
  CloseApp();
});
app.on("quit", () => {
  CloseApp();
});
