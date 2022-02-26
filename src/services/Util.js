module.exports = {
    geraCodigoHash(quantidadeCaracteres){

        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let codigo = '';

        try {
            for (let i = 0; i < quantidadeCaracteres; i++) {
                codigo += characters[Math.floor(Math.random() * characters.length)];
            }
            return codigo;
        } catch (error) {
            
            return "123ab"
        }
    }
}