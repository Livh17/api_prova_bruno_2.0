import Router from 'express'
const endpoints = Router()

import {generateToken} from '../utils/jwt.js'

import { InserirUsuario, ListarUsuarios, ValidarCredenciais }  from "../repository/UsuarioRepository.js"




endpoints.get('/usuario', async (req,resp) =>{
    let registro = await ListarUsuarios()
    resp.send(registro)
})



endpoints.post('/usuario', async (req,resp) =>{
    let NovoDado = req.body
    let id = await InserirUsuario(NovoDado)
    resp.send({novoId:id})
})



endpoints.post('/usuario/login', async (req,resp) =>{
    let email = req.body.email
    let senha = req.body.senha

    let credenciais = await ValidarCredenciais(email,senha)

    if(!credenciais){
        resp.status(401).send({ erro: 'Credenciais invalidas!'})
    }
    else {
        let token =generateToken(credenciais)
        resp.send({ token: token})
    }
})




export default endpoints