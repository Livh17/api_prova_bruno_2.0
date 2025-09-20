import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import { inserirMensagem, listarMensagensPorSala, verificarPermissaoSala } from '../repository/chatRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/chat/:sala', autenticador, async (req, resp) => {
    const salaId = req.params.sala
    const usuarioId = req.user.id
    const mensagem = req.body.mensagem

    if(!mensagem) {error: 'Mensagem é obrigatoria'}

    const permitido = verificarPermissaoSala(salaId, usuarioId)
    if(!permitido) {
        resp.status(400).send({mensagem: 'Você não tem permissão para enviar mensagens'})
    }
    else {
        await inserirMensagem(usuarioId, salaId, mensagem)
        resp.send({mensagem: 'Mensagem enviada com sucesso'
    }
 });


endpoints.get('/chat/:sala', autenticador, async (req, resp) => {
    
});


export default endpoints;