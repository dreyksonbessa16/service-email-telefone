const express = require("express");
const router = express.Router();
const serviceEmail = require("../services/email");
const serviceToken = require("../services/token");
const pg = require("../configs/database").pool;

router.post("/", (req, res) => {

    const { email, telefone } = req.body;

    pg.connect((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM public.token_email where email = $1;",
            [email],
            (error, results) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (results.rowCount) {
                    conn.query(
                        "SELECT * FROM public.token_email where email = $1 and status = FALSE;",
                        [email],
                        (error, results) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }

                            if (results.rowCount) {

                                const token = serviceToken.generate(email);

                                serviceEmail.send(token, email).then(ret => {
                                    console.log(ret);
                                }, (error) => {
                                    return res.status(500).send({ error: error });
                                })

                                return res.status(200).send({ message: "Email Reenviado com Sucesso. Verifique sua caixa de entrada!" });
                            }
                            return res.status(500).send({ message: "Email já verificado!" });

                        }
                    )

                } else {
                    conn.query(
                        "INSERT INTO public.token_email (email, status) VALUES ($1, FALSE);",
                        [email],
                        (error, results) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }

                            const token = serviceToken.generate(email);

                            serviceEmail.send(token, email).then(ret => {
                                console.log(ret);
                            }, (error) => {
                                return res.status(500).send({ error: error });
                            })

                            return res.status(200).send({ message: "Email Enviado com Sucesso. Verifique sua caixa de entrada!" });

                        }
                    )
                }
            }
        )
    })
});

module.exports = router;