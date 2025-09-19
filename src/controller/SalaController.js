import Router from 'express'
import {getAuthentication} from '../utils/jwt.js'
import { buscarSalaPorId, inserirSala_inserirPermissao } from '../repository/SalaRepository'

const endpoints = Router()
const autenticador = getAuthentication()



endpoints.post('/sala', autenticador, async (resp,req) =>{
    let usuarioID = req.user.id 
    let nome = req.body
    let aprovado = true
    let credenciais = await inserirSala_inserirPermissao(nome, usuarioID, aprovado)

    if(!credenciais){
        resp.status(401).send({ erro: 'Invalido!'})
    }
    else {
        resp.send({salaId:credenciais})
    }
})



endpoints.get('/sala/:id', autenticador, async (resp, req) =>{
    let id = req.params.id

    let registro = await buscarSalaPorId(id)

    resp.send(registro)
})





