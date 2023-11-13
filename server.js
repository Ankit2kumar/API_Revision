import express from 'express';
import  listEndpoints  from "express-list-endpoints";
import booksRoute from './src/books/index.js';

const server= express()
const Port=3001


server.use(express.json()) 



server.use("/books",booksRoute)
console.table(listEndpoints(server))

server.listen(Port, ()=>{
    console.log("Server is listening at Port", Port);
})