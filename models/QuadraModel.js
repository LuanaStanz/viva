const fs = require('fs'); //node.js modules
const path = require('path');
const CAMINHO = path.join(__dirname, '../data/quadras.json');

//json para obj
function ler() {
  return JSON.parse(fs.readFileSync(CAMINHO)); 
}

//obj para json
function salvar(dados) {
  fs.writeFileSync(CAMINHO, JSON.stringify(dados)); 
}

module.exports = { ler, salvar };