import Router from 'express'
import {getAuthentication} from '../utils/jwt.js'
import { buscarSala, criarSala } from '../repository/SalaRepository.js'

const endpoints = Router()
const autenticador = getAuthentication()



endpoints.post('/sala', autenticador, async (req,resp) =>{
    let nome = req.body.nome
    let userID = req.user.id
    let aprovado = true

    if (!nome){
        resp.status(400).send({mensagem:'Nome da sala obrigatório!'})
    }
    else if (!userID){
        resp.status(400).send({mensagem:'Usuário não identificado!'})
    }
    else{
        let salaId = await criarSala(nome, userID, aprovado)
        resp.send({salaId: salaId})
    }
})






endpoints.get('/sala', autenticador, async (req, resp) =>{
    let registro = await buscarSala()

    resp.send(registro)
})





export default endpoints

