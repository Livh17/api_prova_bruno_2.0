import { conection } from './conection.js';


export async function inserirSala(nome, usuarioId) {
    const comando = `INSERT INTO sala (nome, criador_id) 
    VALUES (?, ?);
    
    
    INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)  
    VALUES (?, ?, TRUE);

    `
    const [info] = await conection.query(comando, [
    nome, usuarioId])
    return info.insertId
}



export async function buscarSalaPorId(Id) {
    const comando = `
    select *from sala
    where sala_id = ?`

    const [registro] = await conection.query(comando,[Id])
    return registro
}

