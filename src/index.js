import express from 'express'

const app = express()
const porta = 3333

app.use(express.json())

let users = [
    {
        id: 1,
        name: 'carla'
    },
    {
        id: 2,
        name: 'eduardo'
    }
]

app.get('/', (request, response) => {
    if(users.length === 0)
    return response.status(404).json({
        mensagem: 'nenhum usuario encontrado'
    })  
    response.json(users)
})

app.post('/users', (request, response) => {
    const name  = request.body.name
    if(!name){
        return response.status(400).json({
            mensagem: 'nome do usuario exigido'
        })  
    }

    const newUser = {
        id: users.length + 1,
        name
    }

    users.push(newUser)

    return response.status(201).json({
        message: "Usuario cadastrado com sucesso"
    })
})

app.put("/users/:id", (request, response) => {

    const { id } = request.params

    const {name: updateName} = request.body
    
    const user = users.find(user => user.id == id)
    
    if(!user){
        return response.status(404).json({
            message: 'Usuario não enontrado'
        })
    }
    user.name = updateName
    

    return response.status(200).json({
        message: "usuario alterado", user
    })
})


app.delete("/user/:id", (request, response) => {
    const { id } = request.params
    
    const user = users.findIndex(user => user.id === Number(id))
    
    if(user === -1){
        return response.status(404).json({
            message: 'Usuario não enontrado'
        })
    }

    const deletedUser = users.splice(user, 1)

    response.status(200).json({
        message: "usuario excluido com sucesso", user
    })
})


app.listen(porta, () => {console.log(`servidor iniciado na porta ${porta}`)})