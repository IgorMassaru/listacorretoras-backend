const express = require('express');

const server = express();

server.use(express.json());

const corretoras = [
        {nomecorretora:'XPInvestimentos',ativo:'ETFs',valorporoperacao:8},
        {nomecorretora:'RicoCorretora',ativo:'Acoes',valorporoperacao:7},
        {nomecorretora:'ToroInvestimentos',ativo:'Commodities',valorporoperacao:9},
        {nomecorretora:'ClearCorretora',ativo:'Minicontratos',valorporoperacao:5},
        {nomecorretora:'ModalMais',ativo:'Moedas',valorporoperacao:1}
]

server.get('/produto', function(request, response) {
    response.json(corretoras);
})

server.post('/produto',function (request,response){
    //const nomecorretora = request.body.nomecorretora;
    //const ativo = request.body.ativo;
    //const valorporoperacao = request.body.valorporoperacao;
    
    const {nomecorretora,ativo,valorporoperacao} = request.body;
    corretoras.push({nomecorretora,ativo,valorporoperacao})
    response.status(204).send();
})

server.put('/produto/:id',function(request,response){
    const id = request.params.id;
    const {nomecorretora,ativo,valorporoperacao} = request.body;

    for(let i = 0; i < corretoras.length; i++){
        if(corretoras[i].nomecorretora == id){
                corretoras[i].nomecorretora = nomecorretora;
                corretoras[i].ativo = ativo;
                corretoras[i].valorporoperacao = valorporoperacao;
                break;

        }
    }

    return response.status(204).send();
})

server.delete('/produto/:id', function(request,response){
    
    const id = request.params.id;
    for(let i = 0; i < corretoras.length; i++){
        if(corretoras[i].nomecorretora == id){
                corretoras.splice(i,1);
                break;

        }
    }
    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);