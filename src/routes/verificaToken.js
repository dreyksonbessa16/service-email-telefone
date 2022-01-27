const express = require("express");
const router = express.Router();
const serviceToken = require("../services/token");
const pg = require("../configs/database").pool;

router.get("/:id", (req, res) => {

    const token = req.params.id;

    serviceToken.decode(token);

    if (req.usuario) {

        pg.connect((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }
            conn.query(
                "SELECT * FROM public.token_email where email = $1 and status = FALSE;",
                [req.usuario.email],
                (error, results) => {
                    if (error) { return res.status(500).send({ error: error }) }
                    if (results.rowCount) {
                        conn.query(
                            "update token_email set status = true where email = $1;",
                            [req.usuario.email],
                            (error, results) => {
                                conn.release();
                                if (error) { return res.status(500).send({ error: error }) }

                                return res.status(200).send({ message: "Email confirmado com Sucesso!" });
                            }
                        )

                    } else {

                        return res.status(200).send({ message: "Este email já foi verificado!" });
                    }
                }
            )
        });

    } else {

        return res.status(500).send({ message: "Erro ao verificar email!" });
    }

});

module.exports = router;