import Router from 'express';
import { getAuthentication } from '../utils/jwt.js';
import { aprovarPermissao, verificarDono, verificarPermissaoSala } from '../repository/SalaPermissaoRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();





endpoints.post('/sala/:sala/entrar', autenticador, async (req, resp) => {
        const salaId = req.params.sala
        const usuarioId = req.user.id

        let registro = await verificarPermissaoSala(salaId, usuarioId, false)

        if (registro.aprovado > 0){
                resp.status(400).send({ mensagem: 'Você já solicitou permissão para entrar nesta sala' })
        }
    
        else {
                resp.send({ mensagem: 'Solicitação enviada com sucesso'})
        }

   
})




endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
        const salaId = req.params.sala
        const usuarioAprovarId = req.params.usuario
        const usuarioLogadoId = req.user.id

        const dono = await verificarDono(salaId, usuarioLogadoId)
        if (dono) {
                await aprovarPermissao(salaId, usuarioAprovarId)
                resp.send({ mensagem: 'Usuário aprovado com sucesso.' })
        }

        else{
            resp.status(400).send({ mensagem: 'Apenas o criador da sala pode aprovar ' })
        }
})





export default endpoints