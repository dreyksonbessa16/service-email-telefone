module.exports = {
    geraCodigoHash(quantidadeCaracteres){

        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let codigo = '';

        for (let i = 0; i < quantidadeCaracteres; i++) {
            codigo += characters[Math.floor(Math.random() * characters.length)];
        }
        return codigo;
    }
}