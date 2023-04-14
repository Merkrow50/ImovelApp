import {DatabaseConnection} from '../database/DatabaseConnection'

const table = "imovel"
const db = DatabaseConnection.getConnection()

export default class ImovelService {

  static addData(param) {
    return new Promise((resolve, reject) => db.transaction(
      tx => {
        tx.executeSql(`insert into ${table} (endereco, locado, foto, tipo, valorAluguel, valorCondominio, numQuarto, numBanheiro)
                       values (?, ?, ?, ?, ?, ?, ?, ?)`,
          [param.endereco, param.locado, param.foto, param.tipo, param.valorAluguel, param.valorCondominio, param.numQuarto, param.numBanheiro],
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
                     set endereco = ?, locado = ?, foto = ?, tipo = ?, valorAluguel = ?, valorCondominio = ?, numQuarto = ?, numBanheiro = ?
                     where id = ?;`, [param.endereco, param.locado, param.foto, param.tipo, param.valorAluguel, param.valorCondominio, param.numQuarto, param.numBanheiro, param.id], () => {
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
