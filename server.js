import express from 'express';
import  listEndpoints  from "express-list-endpoints";
import booksRoute from './src/books/index.js';
import professorRouter from './src/professors/index.js';

const server= express()
const Port=3001


server.use(express.json()) 



server.use("/books",booksRoute)
server.use("/professors", professorRouter)
console.table(listEndpoints(server))

server.listen(Port, ()=>{
    console.log("Server is listening at Port", Port);
})