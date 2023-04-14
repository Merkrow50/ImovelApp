import {DatabaseConnection} from '../database/DatabaseConnection'

const table = "locatario"
const db = DatabaseConnection.getConnection()

export default class LocatarioService {

  static addData(param) {
    return new Promise((resolve, reject) => db.transaction(
      tx => {
        tx.executeSql(`insert into ${table} (nome,
                                             cpf,
                                             data_nascimento,
                                             renda_mensal,
                                             vencimento_aluguel,
                                             inicio_contrato,
                                             fim_contrato,
                                             id_imovel)
                       values (?, ?, ?, ?, ?, ?, ?, ?)`,
          [param.nome, param.cpf, param.data_nascimento, param.renda_mensal, param.vencimento_aluguel, param.inicio_contrato, param.fim_contrato, param.id_imovel],
          (_, {insertId, rows}) => {
            console.log("id insert: " + insertId);
            resolve(insertId)
          }), (sqlError) => {
          console.log(sqlError);
        }
      }, (txError) => {
        console.log(txError);
      }));
  }

  static deleteById(id) {
    db.transaction(
      tx => {
        tx.executeSql(`delete
                       from ${table}
                       where id = ?;`, [id], (_, {rows}) => {
        }), (sqlError) => {
          console.log(sqlError);
        }
      }, (txError) => {
        console.log(txError);

      });
  }

  static updateById(param) {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`update ${table}
                     set nome = ?, cpf = ?, data_nascimento = ?, renda_mensal = ?, vencimento_aluguel = ?, inicio_contrato = ?, fim_contrato = ?, id_imovel = ?
                     where id = ?;`, [param.nome, param.cpf, param.data_nascimento, param.renda_mensal, param.vencimento_aluguel, param.inicio_contrato, param.fim_contrato, param.id_imovel, param.id], () => {
      }), (sqlError) => {
        console.log(sqlError);
      }
    }, (txError) => {
      console.log(txError);

    }));
  }

  static findById(id) {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`select *
                     from ${table}
                     where id = ?`, [id], (_, {rows}) => {
        resolve(rows)
      }), (sqlError) => {
        console.log(sqlError);
      }
    }, (txError) => {
      console.log(txError);

    }));
  }

  static findAll() {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`select *
                     from ${table}`, [], (_, {rows}) => {
        resolve(rows)
      }), (sqlError) => {
        console.log(sqlError);
      }
    }, (txError) => {
      console.log(txError);
    }))

  }

}
