import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const porta = 3333

const users = []
const tasks = []

app.use(express.json())

app.post("/createUser", (request, response) =>{
    const { name, email, pass } = request.body

    const newUser = {
        id: uuidv4(),
        name,
        email,
        pass
    }
})

app.listen(porta, () => {console.log(`servidor iniciado na porta ${porta}`)})