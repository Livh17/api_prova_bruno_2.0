import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import { inserirMensagem, listarMensagensPorSala, verificarPermissaoSala } from '../repository/chatRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/chat/:sala', autenticador, async (req, resp) => {
    const salaId = req.params.sala
    const usuarioId = req.user.id
    const mensagem = req.body.mensagem

    if(!mensagem) {resp.send({mensagem: 'Mensagem é obrigatoria'})}

    const permitido = verificarPermissaoSala(salaId, usuarioId)
    if(!permitido) {
        resp.status(400).send({mensagem: 'Você não tem permissão para enviar mensagens'})
    }

        await inserirMensagem(usuarioId, salaId, mensagem)
        resp.send({mensagem: 'Mensagem enviada com sucesso'})
    
 })








endpoints.get('/chat/:sala/mensagens', autenticador, async (req, resp) => {
    let salaId = req.params.sala
    let usuarioId = req.user.id

    const permitido = await verificarPermissaoSala(salaId, usuarioId)

    if(!permitido) {
        resp.status(400).send({mensagem: 'Você não tem permissão para ver as mensagens'})
    }

    const mensagens = await listarMensagensPorSala(salaId)
    resp.send(mensagens)
    
});


export default endpoints;