import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url))


app.set('view engine','ejs')
app.use(express.static(join(__dirname, 'public')))
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', function(socket){
    console.log(`connected ${socket.id}`)
    socket.on('send-location', function(data){
        io.emit('recieve-location', {id:socket.id, ...data})
    })
    socket.on("disconnect", function() {
        io.emit('user-disconnect', socket.id)
    })

}) 


app.get("/", (req, res) => {
    res.render("index");
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
