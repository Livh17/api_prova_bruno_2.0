
const endpoints = Router();
const autenticador = getAuthentication();



endpoints.post('/sala/:sala/entrar', autenticador, async (req, resp) => {
    
  
});


endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
    
  
});



export default endpoints;