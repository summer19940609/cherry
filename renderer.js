// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron')
const shell = electron.shell
const app = electron.ipcRenderer
const BrowserWindow = electron.remote.BrowserWindow

onload = () => {
	let webview = document.getElementById('webview');
	webview.addEventListener('console-message', (e) => {
		console.log('Guest page logged a message:', e.message)
	})
	webview.addEventListener('new-window', function(e) {
		e.preventDefault();
		this.loadURL(e.url);
	});
}
app.on('downloadProgress', (event, message) => {
	let webview = document.getElementById('webview');
	webview.send('downloadProgress', message);
})
app.on('downloadStart', () => {
	let webview = document.getElementById('webview');
	webview.send('downloadStart', 'ok');
})