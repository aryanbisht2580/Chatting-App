import express from 'express'
import path, { dirname } from 'path'
import { Server } from 'socket.io'
import cors from 'cors'
import http from 'http'
import {connect} from './config.js'
import { chatModel } from './chat.schema.js'
const app=express();
//create server using http
const server=http.createServer(app);

//create socket server
const io=new Server(server,{
    cors:{
        origin:'*',
        methods:["GET","POST"],
    }
})

//use socket events.
io.on('connection',(socket)=>{
    console.log("Connection is established...");
    

    socket.on('join',(data)=>{
        socket.username=data.username;
        socket.room=data.room;
        //send old messages to the client.
        chatModel.find({room:socket.room}).sort({timestamp:1}).limit(50)
        .then(messages=>{
            socket.emit("load_messages",messages);
        }).catch(err=>{
            console.log(err);
        })
    })

    socket.on('new-message',(message)=>{
        const newChat=new chatModel({
            username:socket.username,
            message:message,
            timeStamp:new Date(),
            room:socket.room
        })
        newChat.save();
        //broadcast to all clients
        socket.broadcast.emit('broadcast-message',{username:socket.username,message,room:socket.room});


    })

    socket.on('disconnect',()=>{
        console.log("Connection is disconnected...")
    })
})
// app.use(express.static('public'));

// // app.get("/",(req,res)=>{
// //     res.redirect("/client.html");
// // })

// app.get("/",(req,res)=>{
//     res.sendFile(path.join(path.resolve(),"public","client.html"));
// })

server.listen(3000,()=>{
    console.log("listening on port 3000...");
    connect();
})