import InserirUsuario from "./controller/UsuarioController.js";
import criarSala from "./controller/SalaController.js";
import verificarPermissaoSala from "./controller/SalaPermissaoController.js";



export default function Rotas(api){
    api.use(InserirUsuario)
    api.use(criarSala)
    api.use(verificarPermissaoSala)
}