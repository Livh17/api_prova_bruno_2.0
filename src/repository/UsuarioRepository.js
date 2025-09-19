import { conection } from "./conection.js";


export async function InserirUsuario(NovoDado) {
    const comando = `
    INSERT INTO usuario (nome, email, senha) 
    VALUES (?, ?, MD5(?));
    `    
    const [info] = await conection.query(comando, [
        NovoDado.nome,
        NovoDado.email,
        NovoDado.senha])
    return info.insertId
}




export async function ListarUsuarios() {
    const comando = `select *from usuario`

    const [registro] = await conection.query(comando)
    return registro
}



export async function ValidarCredenciais(email, senha) {
    const comando = `
    SELECT id, nome, email 
     FROM usuario 
     WHERE email = ? 
    AND senha = MD5(?);
`
    const [registro] = await conection.query(comando, [email, senha])
    return registro[0]
}
