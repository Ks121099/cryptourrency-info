const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios= require('axios')
const ipc=electron.ipcRenderer

const notifyBtn = document.getElementById('notif')
const price=document.getElementById('price')
const target=document.getElementById('targetprice')
var targetpriceval

const notification={
title:'BitCoin Alert',
body:'BTC just beat your target price'
}

function btc(){
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
        .then(res =>{
        const cryptos= res.data.USD;
        price.innerHTML='$'+cryptos.toLocaleString('en')
        
        if(targetprice.innerHTML!='' && targetpriceval <= res.data.USD){
            var Notification=new Notification(notification.title,notification)
        }
    })
}
btc();
setInterval(btc,10000);

notifyBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({  
        webPreferences: {
            nodeIntegration: true
          },
           frame: false, transparent: true, width: 400, height: 200})
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetpriceval' ,function(event,arg){
    targetpriceval= Number(arg)
    targetprice.innerHTML='$'+targetpriceval.toLocaleString('en')
})