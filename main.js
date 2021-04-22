const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const url = require("url");
const cheerio = require("cheerio");
const request = require("axios");

let win;
process.env.MODE_ENV = 'production';

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 650,
    icon: __dirname + "/img/icon1.png",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  win.on("closed", () => {
    win = null;
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

app.on("ready", createWindow);

//darwin for windows 10
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}
if (process.env.MODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label : "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}
