import Router from 'express'
import {getAuthentication} from '../utils/jwt.js'
import { buscarSalaPorId, inserirSala } from '../repository/SalaRepository'

const endpoints = Router()
const autenticador = getAuthentication()


endpoints.get('/sala/:id', autenticador, async (resp, req) =>{
    let id = req.params.id

    let registro = await buscarSalaPorId(id)

    resp.send(registro)
})


endpoints.post('/sala/:sala/entrar', autenticador, async (req, resp) => {


endpoints.post('/sala', autenticador, async (resp,req) =>{
    let usuarioID = req.user.id 
    let nome = req.body.nome
    let credenciais = await inserirSala(nome, usuarioID)

    if(!credenciais){
        resp.status(401).send({ erro: 'Usuario não tem permissão!'})
    }
    else {
        resp.send('')
    }
})