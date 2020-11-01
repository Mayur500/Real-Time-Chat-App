const express= require("express");
const app =express();
const http =require('http').createServer(app);
const PORT = process.env.PORT ||3000;


app.use(express.static('public'));

app.get("/",(req,res)=>{
   
    res.sendFile("/public/index.html");
});
http.listen(PORT);
const io =require('socket.io')(http);

io.on('connection',(socket)=>{
socket.on('message', (msg)=>{
socket.broadcast.emit('message', msg);
})
});


