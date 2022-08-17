const express = require('express');
const cors = require('cors');

const {Sequelize} = require('./models');

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

app.post('/servicos', async(req, res) =>{
   await servico.create(
      req.body
   ).then(function(){
      return res.json({
         error: false,
         message: "Serviço criado com sucesso!"
      });
   }).catch(function(erro){
      return res.status(400).json({
         error: true,
         message: "Foi impossível se conectar."
      });
   }); 
});

app.post ('/clientes', async(req, res) =>{
   await cliente.create(
      req.body
   ).then(function(){
      return res.json({
         error: false,
         message: "Cliente criado com sucesso!"
      });
   }).catch(function(erro){
      return res.status(400).json({
         error: true,
         message: "Foi impossível se conectar."
      });
   });
});

app.post ('/pedidos', async(req, res) =>{
   await pedido.create(
      req.body
   ).then(function(){
      return res.json({
         error: false,
         message: "Pedido criado com sucesso!"
      });
   }).catch(function(erro){
      return res.status(400).json({
         error: true,
         message: "Foi impossível se conectar."
      });
   });
});

app.post ('/itempedidos', async(req, res) =>{
   await itempedido.create(
      req.body
   ).then(function(){
      return res.json({
         error: false,
         message: "Item criado com sucesso!"
      });
   }).catch(function(erro){
      return res.status(400).json({
         error: true,
         message: "Foi impossível se conectar."
      });
   });
});

app.get('/listaservicos', async(req, res)=>{
   await servico.findAll({
      raw:true
   }).then(function(servicos){
      res.json({servicos})
   });
});

app.put('/atualizaservico', async(req,res)=>{
   await servico.update(req.body,{
      where: {id: req.body.id}
   }).then(function(){
      return res.json({
         error: false,
         message: "Serviço foi alterado com sucesso!"
      });
   }).catch(function(erro){
      return res.status(400).json({
         error: true,
         message: "Erro na alteração do serviço."
      });
   });
});

app.get('/pedidos/:id', async(req,res)=>{
   await pedido.findByPK(req.params.id,{include:[{all: true}]})
   .then(ped=>{
      return res.json({ped});
   });
});

app.put('/pedidos/:id/editaritem', async(req,res)=>{
   const item={
      quantidade: req.body.quantidade,
      valor: req.body.valor
   };
   if(!await pedido.findByPK(req.params.id)){
      return res.status(400).json({
         error: true,
         message: 'Pedido não foi encontrado.'
      });
   };
   if(!await servico.findByPK(req.body.ServicoId)){
      return res.status(400).json({
         error: true,
         message: 'Serviço não foi encontrado.'
      });
   };
   await itempedido.update(item, {
      where: Sequelize.and({ServicoId: req.body.ServicoId},
         {PedidoId: req.params.id})
   }).then(function(itens){
      return res.json({
         error: false,
         message: "Pedido foi alterado com sucesso!",
         itens
      });  
   }).catch(function(erro){
      return res.status(400).json[{
         error: true,
         message: "Erro: não foi possível alterar."
      }];
   });
});

app.get('/excluircliente/:id', async(req,res)=>{
   await cliente.destroy({
      where: {id: req.params.id} 
   }).then(function(){
      return res.json({
         error: false,
         message: "Cliente foi excluido com sucesso!"
      });
   }).catch(function(erro){
      return res.status(400).json({
         error: true,
         message: "Erro ao excluir o cliente."
      });
   });
});

let port = process.env.PORT || 3001 ;

app.listen(port,(req,res)=>{
    console.log("Servidor ativo: http://localhost:3001 ");
})