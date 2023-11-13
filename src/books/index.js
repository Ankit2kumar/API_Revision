import  express  from "express";
import  uniqId  from "uniqid";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const booksRoute= express.Router()
const filePath= fileURLToPath(import.meta.url)
const booksFolderPath= dirname(filePath)
const booksJSONPath=join(booksFolderPath, "books.json")

booksRoute.post("/", (req,res)=>{
const newBook= {...req.body, createdAt: new Date(), _id: uniqId()}
 const books= JSON.parse(fs.readFileSync(booksJSONPath).toString())
 books.push(newBook)
 fs.writeFileSync(booksJSONPath, JSON.stringify(books))
       res.status(201).send(newBook._id)
})
booksRoute.get("/", (req,res)=>{
    // 1. Read the content
    const books= JSON.parse(fs.readFileSync(booksJSONPath).toString())
    //const booksSpace= join(booksFolderPath +"books.json")
    // 2. Send the content of the response 
    res.send({"response": books})

})
booksRoute.get("/:id", (req,res)=>{
    const books= JSON.parse(fs.readFileSync(booksJSONPath).toString())
    const book= books.find(a=>a._id== req.params.id)
    res.send(book.book)
}) 


booksRoute.put("/:id", (req,res)=>{
    const books= JSON.parse(fs.readFileSync(booksJSONPath).toString())
    const remainingBooks= books.filter(b=>b._id!==req.params.id)
    const updatedBook={...req.body, _id:req.params.id}
    remainingBooks.push(updatedBook)
    fs.writeFileSync(booksJSONPath, JSON.stringify(remainingBooks))
    res.send(updatedBook)
})

booksRoute.delete("/:id", (req,res)=>{
    const books= JSON.parse(fs.readFileSync(booksJSONPath).toString())
    const remainingBooks=books.filter((b)=>b._id!== req.params.id)

    fs.writeFileSync(booksJSONPath, JSON.stringify(remainingBooks))

    res.status(200).send(remainingBooks)

})
export default booksRoute