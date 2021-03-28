import express from 'express';
import * as http from 'http'
import { Server, Socket } from "socket.io";
import path from 'path'


interface Msg {
  user: string, message: any
}
const app = express();
const httpServer = http.createServer(app)

const io = new Server(httpServer)

io.on("connection", (socket:Socket) => {
  console.log('Connected Ready');

  socket.on('sendMessage', (msg:Msg) => {
    // console.log(msg);

    socket.broadcast.emit('sendToAll', msg)
    
  })
})


const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
     console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
   })
// app.get('/', (req,res) => res.send('Express + TypeScript Server'));

app.use(express.static(path.join(__dirname, 'public')))
// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
// });