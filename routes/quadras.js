// rotas da API que o JS do frontend vai acessar
var express = require('express');
var router = express.Router();
const QuadraServices = require('../services/QuadraServices');

//rota para obter as reservas de uma quadra
router.get('/:tipo/disponibilidade', (request, response) => {
  const tipo = request.params.tipo;
  const reservas = QuadraServices.getReservas(tipo);
  if(reservas){
    response.json(reservas);
  } 
  else{
    response.status(404).json({ erro: 'Quadra não encontrada' });
  }
});

//rota para adicionar uma reserva 
router.post('/:tipo/remover', (request, response) => {
  const { data, horario } = request.body;
  const tipo = request.params.tipo;

  const sucesso = QuadraServices.adicionarReserva(tipo, data, horario);
  if(sucesso){
    response.json({ sucesso: true });
  } 
  else{
    response.status(400).json({ erro: 'Erro ao adicionar reserva' });
  }
});

//rota para remover uma reserva
router.post('/:tipo/liberar', (request, response) => {
  const { data, horario } = request.body;
  const tipo = request.params.tipo;

  const sucesso = QuadraServices.liberarReserva(tipo, data, horario);
  if(sucesso){
    response.json({ sucesso: true });
  } 
  else {
    response.status(400).json({ erro: 'Erro ao liberar horário' });
  }
});

module.exports = router;