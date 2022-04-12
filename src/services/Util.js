// module.exports = {
//     geraCodigoHash(quantidadeCaracteres){

//         const characters = '0123456789';
//         let codigo = '';

//         try {
//             for (let i = 0; i < quantidadeCaracteres; i++) {
//                 codigo += characters[Math.floor(Math.random() * characters.length)];
//             }
//             return codigo;
//         } catch (error) {
            
//             logger.error(`UTIL: ERRO AO GERAR CODIGO HASH - ${error}`);
//             return "15935"
//         }
//     }
// }