import { connection } from './connection.js';


export async function inserirMensagem(usuarioId, salaId, mensagem) {
    const comando = `INSERT INTO chat (usuario_id, sala_id, mensagem, criacao)
        VALUES (?, ?, ?, NOW());
    `
    const [registro] = await connection.query(comando, [
        usuarioId, 
        salaId, 
        mensagem, 
        new Date()
    ])
    return registro.insertId
}


export async function listarMensagensPorSala(salaId) {
       const comando = `
        SELECT chat.id,
               chat.usuario_id,
               usuario.nome,
               chat.mensagem,
               chat.criacao
          FROM chat
          JOIN usuario ON chat.usuario_id = usuario.id
         WHERE chat.sala_id = ?
         ORDER BY chat.criacao ASC
    `
    const [registros] = await connection.query(comando, [salaId])
    return registros
}



export async function verificarPermissaoSala(salaId, usuarioId) {
    const comando = `
        SELECT id FROM salaPermissao
        WHERE sala_id = ? AND usuario_id = ? AND aprovado = TRUE;
    `;
    const [registros] = await connection.query(comando, [salaId, usuarioId]);
    return registros.length > 0;
}
