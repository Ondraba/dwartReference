// var oracledb = require('oracledb');

// var final = 'test'


// function finalizeSql(){
//   final = ''
//   oracledb.getConnection(
//       {
//         user          : "system",
//         password      : "oracle",
//         connectString : "localhost:/XE"
//       },
//       function(err, connection)
//       {
//         if (err) { console.error(err); return; }
//         connection.execute(
//           "SELECT * "
//         + "FROM T_GQL_TEST "
//         + "ORDER BY ID DESC",
//           function(err, result)
//           {
//             if (err) { console.error(err); return; }
//             final = result.rows
//           });
//       })
//      return final
// }

// console.log(finalizeSql())