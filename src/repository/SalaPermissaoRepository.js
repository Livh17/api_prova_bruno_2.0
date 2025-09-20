import { conection } from './conection.js';



export async function verificarPermissaoSala(salaId, usuarioId, aprovado) {
    const comando = `INSERT INTO salaPermissao (sala_id, usuario_id, aprovado) 
    VALUES (?, ?, ?)
    `

    const [registro]= await conection.query(comando, [salaId, usuarioId, aprovado])
    return registro.insertId
}




export async function aprovarPermissao(salaId, usuarioId) {
     const comando = `UPDATE salaPermissao 
     SET aprovado = TRUE 
     WHERE sala_id = ? AND usuario_id = ?
    `
    const [registro] = await conection.query(comando, [salaId, usuarioId])
    return registro.affectedRows
}




export async function verificarDono(salaId, usuarioId) {
    const comando = `
        SELECT id FROM sala
        WHERE id = ? AND usuario_id = ?
    `
    const [registros] = await conection.query(comando, [salaId, usuarioId])
    return registros.length > 0
}