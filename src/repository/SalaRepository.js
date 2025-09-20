import { conection } from './conection.js';


export async function criarSala(nome, usuario_id,aprovado) {
    const comando =`
    INSERT INTO sala (nome, usuario_id) VALUES (?, ?);`

    const [registro1]= await conection.query(comando,[
        nome,
        usuario_id
    ])

    const sala_id = registro1.insertId

    const comando1 = `
    INSERT INTO salaPermissao (sala_id, usuario_id, aprovado) VALUES (?, ?, TRUE);`

    const [registro2] = await conection.query(comando1,[
        sala_id,
        usuario_id,
        aprovado
    ])

    return sala_id
}



export async function buscarSala() {
    const comando = `
    select *from sala
`
    const [registro] = await conection.query(comando);
    return registro;
}
