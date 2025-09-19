import { conection } from './conection.js';


export async function inserirPermissao(salaId, usuarioId, aprovado) {
    const comando = `INSERT INTO salaPermissao (sala_id, usuario_id, aprovado) VALUES (?, ?, TRUE);
`
const [info] = await conection.query(comando, [salaId, usuarioId,aprovado])
    return info.insertId
}


export async function aprovarPermissao(salaId, usuarioId) {
    
}


export async function verificarPermissaoSala(salaId, usuarioId) {
    
}