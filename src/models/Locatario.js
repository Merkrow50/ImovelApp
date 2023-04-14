export class Locatario {

  constructor(id, nome,
    cpf,
    data_nascimento,
    renda_mensal,
    vencimento_aluguel,
    inicio_contrato,
    fim_contrato,
    id_imovel) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.data_nascimento = data_nascimento;
    this.renda_mensal = renda_mensal;
    this.vencimento_aluguel = vencimento_aluguel;
    this.inicio_contrato = inicio_contrato;
    this.fim_contrato = fim_contrato;
    this.id_imovel = id_imovel;
  }

  id;
  nome;
  cpf;
  data_nascimento;
  renda_mensal;
  vencimento_aluguel;
  inicio_contrato;
  fim_contrato;
  id_imovel

}
