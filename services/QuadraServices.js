const QuadraModel = require('../models/QuadraModel'); //ler(), salvar()

//gera lista de datas dos proximos 30 dias
function gerarProximos30Dias(){
  const hoje = new Date();
  const datas = [];
  for(let i = 0; i < 30; i++) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + i);
    datas.push(data.toISOString().split('T')[0]);
  }
  return datas;
}

function removerPassado(reservas){ //dados[tipo].reservas
  const hoje = new Date();
  const hojeStr = hoje.toISOString().split('T')[0];
  for(const data in reservas) {
    if(data < hojeStr) delete reservas[data];
  }
}

function atualizarDatas(){
  const dados = QuadraModel.ler();
  const futuras = gerarProximos30Dias(); 

  for(const tipo in dados){
    if(!dados[tipo].reservas) dados[tipo].reservas = {}; //reservas

    removerPassado(dados[tipo].reservas);

    futuras.forEach(data =>{
      if(!dados[tipo].reservas[data]) dados[tipo].reservas[data] = []; //data
    });
  }

  QuadraModel.salvar(dados);
}

function getReservas(tipo){
  atualizarDatas();
  const dados = QuadraModel.ler();
  return dados[tipo]?.reservas || null;
}

function adicionarReserva(tipo, data, horario){
  const dados = QuadraModel.ler();
  if(!dados[tipo]) return false;
  if(!dados[tipo].reservas[data]) dados[tipo].reservas[data] = [];
  if(!dados[tipo].reservas[data].includes(horario)) {
    dados[tipo].reservas[data].push(horario);
    dados[tipo].reservas[data].sort();
    QuadraModel.salvar(dados);
  }
  return true;
}

function liberarReserva(tipo, data, horario){
  const dados = QuadraModel.ler();
  if(!dados[tipo]) return false;
  if(!dados[tipo].reservas[data]) return false;
  dados[tipo].reservas[data] = dados[tipo].reservas[data].filter(h => h !== horario);
  QuadraModel.salvar(dados);
  return true;
}

module.exports = {
  gerarProximos30Dias,
  removerPassado,
  atualizarDatas,
  getReservas,
  adicionarReserva,
  liberarReserva
};