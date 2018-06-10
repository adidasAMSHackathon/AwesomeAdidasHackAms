import * as serial from 'serialport'
import fetch from 'node-fetch'
import * as ws from 'ws'

let wss: ws.Server
let browser: ws

let port: serial

port = new serial('/dev/cu.usbmodem1422', {
    baudRate: 115200,
}, error)
port.on('error', error)
port.on('data', data)

wss = new ws.Server({ port: 8085 })
wss.on('connection', function connection (socket) {
    socket.on('message', function incoming (message) {
        console.log('received: %s', message)
    })
    browser = socket
    browser.send(JSON.stringify('websocket connected'))
})

function error (err: any) {
    if (err) {
        console.log('Error: ', err.message)
    } else {
        console.log('opened')
        port.write('hello\n')
    }
}

async function command (command: string, arg: string) {
    console.log(command, arg)
    switch (command) {
        case 'occupied':
            if (browser)
                browser.send(JSON.stringify({
                    command: 'occupied',
                    arg: parseInt(arg, 10) > 0,
                }))
            break
        default:
            break
    }
}

let remain = ''
function data (data: Buffer) {
    let message = data.toString('utf8')
    console.log('Data received:', message)
    remain += message
    console.log('Remain:', remain)
    let index = remain.indexOf('\n')
    while (index !== -1) {
        let unparsed = remain.substring(0, index)
        remain = remain.substring(index + 1)
        let split = unparsed.split(':')
        let cmd = split[0]
        let arg = split[1]
        console.log('Remain:', remain)
        command(cmd, arg)
        index = remain.indexOf('\n')
    }
}

import * as http from 'http'
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.write('Hello World!')
    res.end()
    port.write('blink\n')
}).listen(9000)
