import InserirUsuario from "./controller/UsuarioController.js";

export default function Rotas(api){
    api.use(InserirUsuario) 
}