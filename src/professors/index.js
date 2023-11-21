import express from "express";
import  fs  from "fs";
import  uniqId  from "uniqid";
import {  dirname,join } from "path";
import { fileURLToPath } from "url";

const fileName= fileURLToPath(import.meta.url)
const professorFolderPath= dirname(fileName)
const professorJSONPath= join(professorFolderPath, "professor.json")


const professorRouter=express.Router()

professorRouter.get("/", (req, res,err)=>{
const allProfessors= JSON.parse(fs.readFileSync(professorJSONPath))
res.status(200).send(allProfessors)

})

professorRouter.get("/:id", (req, res)=>{
const professors= JSON.parse(fs.readFileSync(professorJSONPath).toString())
const professor= professors.find(a=>a._id==req.params.id)
res.send(professor).status(200) 
    
})

professorRouter.post("/", (req, res)=>{
const newProfessor={...req.body, createdAt: new Date(), _id:uniqId()}
const allProfessors= JSON.parse(fs.readFileSync(professorJSONPath).toString())
allProfessors.push(newProfessor)
    fs.writeFileSync(professorJSONPath, JSON.stringify(allProfessors))
    res.status(201).send(newProfessor._id)
})

professorRouter.put("/", (req, res)=>{

    
})

professorRouter.delete("/:id", (req, res)=>{
const allProfessor= JSON.parse(fs.readFileSync(professorJSONPath).toString())
const remainingProfessors= allProfessor.filter(professor=>(professor._id!== req.params.id))
fs.writeFileSync(professorJSONPath, JSON.stringify(remainingProfessors))

res.send(remainingProfessors).status(200)
    
})

export default professorRouter