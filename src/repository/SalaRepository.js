import { conection } from './conection.js';




export async function inserirSala_inserirPermissao(nome, usuarioId, aprovado) {
    const comando1 = `INSERT INTO sala (nome, criador_id) 
    VALUES (?, ?);
    `
    const [info] = await conection.query(comando1, [
    nome.nome, usuarioId])

    const salaId = info.insertId

    


    const comando2 = `
    INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)  
    VALUES (?, ?, TRUE);
    `
    const [info2] = await conection.query(comando2, [
    insertId, usuarioId], aprovado)
       return salaId
}







export async function buscarSalaPorId(Id) {
    const comando = `
    select *from sala
    where sala_id = ?`

    const [registro] = await conection.query(comando,[Id])
    return registro
}

