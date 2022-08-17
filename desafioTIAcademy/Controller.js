const express = require('express');
const cors = require('cors');
const {Sequelize} = require('./models');
const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Clientes;
let cartao = models.Cartao;
let compra = models.Compra;
let promocao = models.Promocao;
let empresa = models.Empresa;

//Inserir
app.post('/cliente ', async(req, res)=>{
    await cliente.create(
        req.body
    ).then(cli =>{
        return res.json({
            error: false,
            message: "Cliente foi inserido com sucesso!",
            cli
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.post('/cliente/:id/cartao', async(req, res)=>{
    const cart ={
        dataCartao: req.body.dataCartao,
        validade: req.body.validade,
        ClienteId: req.params.id
    };
    if(! await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };
    await cartao.create(cart)
    .then(cartcli =>{
        return res.json({
            error: false,
            message: "Cartão foi inserido com sucesso!",
            cartcli
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.post('/promocao/:id/cartao/:id/compra', async(req, res)=>{
    const comp ={
        data: req.body.data,
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        PromocaoId: req.params.id,
        CartaoId: req.params.id
    };
    if(! await cartao.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Cartão não existe."
        });
    }if(! await promocao.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Promocão não existe."
        });
    };
    await compra.create(comp)
    .then(compcartprom =>{
        return res.json({
            error: false,
            message: "Compra foi inserida com sucesso!",
            compcartprom
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.post('/empresa', async(req, res)=>{
    await empresa.create(
        req.body
    ).then(emp =>{
        return res.json({
            error: false,
            message: "Empresa foi inserida com sucesso!",
            emp
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.post('/empresa/:id/promocao', async(req, res)=>{
    const prom ={
        nome: req.body.nome,
        descricao: req.body.descricao,
        validade: req.body.validade,
        EmpresaId: req.params.id
    };
    if(! await empresa.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Empresa não existe."
        });
    };
    await promocao.create(prom)
    .then(promemp =>{
        return res.json({
            error: false,
            message: "Promoção foi inserida com sucesso!",
            promemp
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//Listar
app.get('/clientes', async(req, res)=>{
    await cliente.findAll()
    .then(cli =>{
        return res.json({
            error: false,
            cli
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.get('/cliente/:id/cartaos', async(req, res)=>{
    await cartao.findAll({
        where: {ClienteId: req.params.id}
    }).then(cartaos =>{
        return res.json({
            error: false,
            cartaos
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.get('/cartaos/:id', async(req, res)=>{
    await cartao.findAll(req.params.id)
    .then(cart =>{
        return res.json({
            error: false,
            cart
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.get('/promocao/:id/compras', async(req, res)=>{
    await compra.findAll({
        where: {PromocaoId: req.params.id}
    }).then(compras =>{
        return res.json({
            error: false,
            compras
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.get('/cartao/:id/compras', async(req, res)=>{
    await compra.findAll({
        where: {CartaoId: req.params.id}
    }).then(compras =>{
        return res.json({
            error: false,
            compras
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.get('/promocao/:id/cartao/:id/compras', async(req, res)=>{
    await compra.findAll({
        where: {PromocaoId: req.params.id, CartaoId: req.params.id}
    }).then(compras =>{
        return res.json({
            error: false,
            compras
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.get('/empresa/:id/promocaos', async(req, res)=>{
    await promocao.findAll({
        where: {EmpresaId: req.params.id}
    }).then(promos =>{
        return res.json({
            error: false,
            promos
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.get('/promocao/:id', async(req, res)=>{
    await promocao.findAll(req.params.id)
    .then(promo =>{
        return res.json({
            error: false,
            promo
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.get('/empresas', async(req, res)=>{
    await empresa.findAll()
    .then(emp =>{
        return res.json({
            error: false,
            emp
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//alterar

app.put('/cliente/:id ', async(req, res)=>{
    const cli ={
        id: req.params.id,
        nome: req.body.nome,
        cidade: req.body.cidade,
        uf: req.body.uf,
        nascimento: req.body.nascimento
    }
    await cliente.update(
        cli
    ).then(umcliente =>{
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso!",
            umcliente
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.put('/cartao/:id', async(req, res)=>{
    const cart ={
        id: req.params.id,
        dataCartao: req.body.dataCartao,
        validade: req.body.validade,
        ClienteId: req.body.ClienteId
    };
    if(! await cliente.findByPk(req.body.ClienteId)){
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };
    await cartao.update(cart, {
        where: Sequelize.and({ClienteId: req.body.ClienteId})
    }).then(umcartao =>{
        return res.json({
            error: false,
            message: "Cartão foi alterado com sucesso!",
            umcartao
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.put('/compra', async(req, res)=>{
    const comp ={
        data: req.body.data,
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        PromocaoId: req.body.PromocaoId,
        CartaoId: req.body.CartaoId
    };
    if(! await cartao.findByPk(req.body.CartaoId)){
        return res.status(400).json({
            error: true,
            message: "Cartão não existe."
        });
    }if(! await promocao.findByPk(req.body.PromocaoId)){
        return res.status(400).json({
            error: true,
            message: "Promocão não existe."
        });
    };
    await compra.update(comp, {
        where: Sequelize.and({
            PromocaoId: req.body.PromocaoId,
            CartaoId: req.body.CartaoId
        })
    }).then(umacompra =>{
        return res.json({
            error: false,
            message: "Compra foi alterada com sucesso!",
            umacompra
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.put('/promocao/:id', async(req, res)=>{
    const promo ={
        id: req.params.id,
        nome: req.body.nome,
        descricao: req.body.descricao,
        validade: req.body.validade,
        EmpresaId: req.body.EmpresaId
    };
    if(! await empresa.findByPk(req.body.EmpresaId)){
        return res.status(400).json({
            error: true,
            message: "Empresa não existe."
        });
    };
    await promocao.update(promo, {
        where: Sequelize.and({EmpresaId: req.body.EmpresaId})
    }).then(umapromo =>{
        return res.json({
            error: false,
            message: "Promoção foi alterada com sucesso!",
            umapromo
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.put('/empresa/:id ', async(req, res)=>{
    const emp ={
        id: req.params.id,
        nome: req.body.nome,
        dataAdesao: req.body.dataAdesao
    }
    await empresa.update(
        emp
    ).then(umaemp =>{
        return res.json({
            error: false,
            message: "Empresa foi alterada com sucesso!",
            umaemp
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//excluir
app.delete('/excluir-cliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi excluido com sucesso!"
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.delete('/excluir-cartao/:id', async(req, res)=>{
    await cartao.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cartão foi excluido com sucesso!"
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.delete('/excluir-promocao/:id', async(req, res)=>{
    await promocao.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Promoção foi excluida com sucesso!"
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.delete('/promocao/:id/cartao/:id/excluir-compra', async(req, res)=>{
    await compra.destroy({
        where: {PromocaoId: req.params.id, CartaoId: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra foi excluida com sucesso!"
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

app.delete('/excluir-empresa/:id', async(req, res)=>{
    await empresa.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Empresa foi excluida com sucesso!"
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001 ');
});