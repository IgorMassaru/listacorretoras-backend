const express = require('express');

const database = require('./database');

const server = express();


server.use(express.json());

// const corretoras = [
//        {nomecorretora:'XPInvestimentos',ativo:'ETFs',valorporoperacao:8},
//      {nomecorretora:'RicoCorretora',ativo:'Acoes',valorporoperacao:7},
//         {nomecorretora:'ToroInvestimentos',ativo:'Commodities',valorporoperacao:9},
//        {nomecorretora:'ClearCorretora',ativo:'Minicontratos',valorporoperacao:5},
//        {nomecorretora:'ModalMais',ativo:'Moedas',valorporoperacao:1}
// ]

server.get('/produto',async function(request, response) {
    const dados = await database.read();
    return response.json(dados);
})

server.post('/produto',async function(request,response){
    //const nomecorretora = request.body.nomecorretora;
    //const ativo = request.body.ativo;
    //const valorporoperacao = request.body.valorporoperacao;
    
    const nomecorretora = request.body.nomecorretora;
    const ativo = request.body.ativo;
    const valorporoperacao = request.body.valorporoperacao;
    const result = await database.create(nomecorretora,ativo,valorporoperacao);
    
    return response.status(204).send();
    
    //const {nomecorretora,ativo,valorporoperacao} = request.body;
    //corretoras.push({nomecorretora,ativo,valorporoperacao})
    //response.status(204).send();
})

server.put('/produto/:id',async function(request,response){
   const id = request.params.id;
   const {nomecorretora,ativo,valorporoperacao} = request.body;

    const result = await database.update(nomecorretora,ativo,valorporoperacao,id);
        

    return response.status(204).send();
})

server.delete('/produto/:id',async function(request,response){
    
   const id = request.params.id;
    const result = await database.delete(id);
   return response.status(204).send(); 
})

server.listen(process.env.PORT || 3000);