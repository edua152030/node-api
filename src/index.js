import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt '

const app = express()
const porta = 3333

const users = []
const tasks = []

app.use(express.json())

app.post("/createUser", (request, response) =>{
    //pegando as variaveis do body
    const { name, email, pass } = request.body

    //percorrendo o array para validar se o email esta = body.email
    const emailExistente = users.find(user => user.email === email)
    
    //alertando se ja tem email cadastrado
    if (emailExistente){
        return response.status(400).json({
            message: 'email ja existe no cadastro'
        })
    }

    //criando objeto para o push
    const newUser = {
        id: uuidv4(),
        name,
        email,
        pass
    }

    //verificando se a senha é valida
    const passwordFail = users.find(user => user.pass === pass)
    
    //inserindo no array o objeto criado
    users.push(newUser)
    
    //resposta se deu tudo ok
    response.status(201).json({
        message: 'usuario cadastrado', newUser
    })
})

app.get("/listUsers", (request, response) => {
    const user =  users.forEach()
    return response.status(200).json({
        user
    })
})

app.listen(porta, () => {console.log(`servidor iniciado na porta ${porta}`)})