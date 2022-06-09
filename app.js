import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import routerProd from "./routers/routerProd.js";
import Message from "./class/messages.js";

const messages = new Message('messages');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Configuracion de vistas
app.set('view engine', 'ejs');
app.set('views', './views');


//Configuracion de ruta
app.use('/api/productos', routerProd);


//Configurar Servidor
const PORT = process.env.PORT || 8080;
const server = createServer(app);
const io = new Server(server);


server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

server.on('error', error => {
    console.log('error' ,error);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

//Configurar Socket

io.on('connection', async (socket) => {

    const arrayMessage = await messages.getAllMessage();

    socket.emit('message', arrayMessage);
    socket.on('new-message', async (data) => {
        await messages.save(data)
        socket.broadcast.emit('messages', data);
    })

})