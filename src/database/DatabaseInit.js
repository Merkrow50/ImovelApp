import {DatabaseConnection} from './DatabaseConnection'

var db = null
export default class DatabaseInit {

  constructor() {
    db = DatabaseConnection.getConnection()
    db.exec([{sql: 'PRAGMA foreign_keys = ON;', args: []}], false, () =>
      console.log('Foreign keys turned on')
    );
    this.InitDb()
  }

  InitDb() {
    var sql = [
      `DROP TABLE IF EXISTS imovel;`,
      `DROP TABLE IF EXISTS locatario;`,


      `create table if not exists imovel(
           id integer primary key autoincrement,
           locador text,
           categoria text,
           endereco text,
           locado text,
           foto text,
           tipo text,
           valorAluguel int,
           valorCondominio int,
           numQuarto int,
           numBanheiro int
       );`,

      `create table if not exists locatario(
                                            id integer primary key autoincrement,
                                            nome text,
                                            cpf text,
                                            data_nascimento text,
                                            renda_mensal text,
                                            vencimento_aluguel text,
                                            inicio_contrato text,
                                            fim_contrato text,
                                            id_imovel
       );`,

      `insert into imovel(locador, categoria, endereco, locado, foto, tipo, valorAluguel, valorCondominio, numQuarto, numBanheiro)
       values('Não Locado','Aluguel', 'Rua tananan', 'Não', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShvtqkzTq_ttHVEAf8ZTKfRLQYdotcMUVgCA&usqp=CAU','Casa',1200,800,4,2);`,
    ];

    db.transaction(
      tx => {
        for (var i = 0; i < sql.length; i++) {
          console.log("execute sql : " + sql[i]);
          tx.executeSql(sql[i]);
        }
      }, (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
      }, () => {
        console.log("transaction complete call back ");
      }
    );
  }

}
