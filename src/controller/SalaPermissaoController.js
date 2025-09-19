import Router from 'express';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const autenticador = getAuthentication();



endpoints.post('/sala/:sala/entrar', autenticador, async (req, resp) => {
        const salaId = req.params.sala;
        const usuarioId = req.user.id; 

       
        await EntradaDono(salaId, usuarioId);

        resp.send({mensagem:'Solicitação de entrada enviada.', sala: salaId, usuario: usuarioId });
    
        resp.status(401).send({ error: 'Erro ao entrada na sala.'
});


endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
    
  
});



export default endpoints;