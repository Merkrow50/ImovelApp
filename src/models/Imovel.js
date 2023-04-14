export class Imovel {

  constructor(id, locador, categoria, endereco, locado, foto, tipo, valorAluguel, valorCondominio, numQuarto, numBanheiro) {
    this.id = id;
    this.locador = locador;
    this.categoria = categoria;
    this.endereco = endereco;
    this.locado = locado;
    this.foto = foto;
    this.tipo = tipo;
    this.valorAluguel = valorAluguel;
    this.valorCondominio = valorCondominio;
    this.numBanheiro = numBanheiro;
    this.numQuarto = numQuarto;
  }

  id;
  locador;
  categoria;
  endereco;
  locado;
  foto;
  tipo;
  valorAluguel;
  valorCondominio;
  numQuarto;
  numBanheiro;

}
