const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const PORT = process.env.PORT || '3001';

const pool = require('./config/database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
    console.log(`Listening ${PORT} port`);
})

// Rota que disponibiliza a consulta da relação de Paciente com Doador
app.get("/", async (req, res) => {
    try {
        const sqlQuery = 'SELECT paciente.nome as Paciente, doador.nome as Doador, doacao.data_doacao as `Data da Doação` from (( paciente INNER JOIN doacao ON paciente.rg_paciente = doacao.rg_paciente) INNER JOIN doador ON doacao.rg_doador = doador.rg_doador)';
        const resultRows = await pool.query(sqlQuery, []);

        const query = {
            title: 'Relação de Usuários com Doadores',
            data: resultRows,
            fields: ['Paciente', 'Doador', 'Data da Doação'],
        }
        res.status(200).render("index", query);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get("/getPatient/:id", async (req, res) => {
    try {
        const sqlQuery = `SELECT nome as 'Nome', tipo_sanguineo as 'Tipo Sanguíneo', tipo_doacao as 'Tipo de Doação', prioridade as 'Prioridade' FROM paciente WHERE nome =?`;
        const resultRows = await pool.query(sqlQuery, req.params.id);

        const query = {
            title: 'Relação de Usuários com Doadores',
            data: resultRows,
            fields: ['Nome', 'Tipo Sanguíneo', 'Tipo de Doação', 'Prioridade'],
        }
        res.status(200).render("index", query);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get("/donorHospital", async (req, res) => {
    try {
        const sqlQuery = 'SELECT doador.nome as Doador, hospital.nome as Hospital, doacao.data_doacao as `Data da Doação` from (( hospital INNER JOIN doacao ON doacao.id_hospital = hospital.id_hospital) INNER JOIN doador ON doacao.rg_doador = doador.rg_doador)';
        const resultRows = await pool.query(sqlQuery, []);

        const query = {
            title: 'Relação de Doadores com Hospital',
            data: resultRows,
            fields: ['Doador', 'Hospital', 'Data da Doação'],
        }
        res.status(200).render("index", query);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get("/organCity", async (req, res) => {
    try {
        const sqlQuery = 'SELECT DISTINCT hospital.cidade as `Cidade`, orgao.nome_orgao as `Órgãos` from (( hospital INNER JOIN doacao ON hospital.id_hospital = doacao.id_hospital) INNER JOIN orgao ON doacao.id_doacao = orgao.id_doacao)';
        const resultRows = await pool.query(sqlQuery, []);

        const query = {
            title: 'Orgãos por Cidade',
            data: resultRows,
            fields: ['Cidade', 'Órgãos'],
        }
        res.status(200).render("index", query);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get("/organHospital", async (req, res) => {
    try {
        const sqlQuery = 'SELECT DISTINCT hospital.nome as `Hospital`, paciente.tipo_doacao as `Tipo de Doação` from (( doacao INNER JOIN paciente ON doacao.rg_paciente = paciente.rg_paciente) INNER JOIN hospital ON hospital.id_hospital = doacao.id_hospital)';
        const resultRows = await pool.query(sqlQuery, []);

        const query = {
            title: 'Tipos de Órgãos por Hospitais',
            data: resultRows,
            fields: ['Hospital', 'Tipo de Doação'],
        }
        res.status(200).render("index", query);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get("/bloodAmount", async (req, res) => {
    try {
        const sqlQuery = 'SELECT doador.tipo_sanguineo as `Tipo de Sangue`, count(sangue.quantidade) as `Quantidade Armazenada` from (( doador INNER JOIN doacao ON doador.rg_doador = doacao.rg_doador) INNER JOIN sangue ON doacao.id_doacao = sangue.id_doacao) GROUP by doador.tipo_sanguineo';
        const resultRows = await pool.query(sqlQuery, []);

        const query = {
            title: 'Quantidade de Sangue por Cidade',
            data: resultRows,
            fields: ['Tipo de Sangue', 'Quantidade Armazenada'],
        }
        res.status(200).render("index", query);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get("/priorityAmount", async (req, res) => {
    try {
        const sqlQuery = 'SELECT prioridade as `Prioridade`, count(rg_paciente) as `Quantidade de Pacientes` from paciente GROUP by prioridade';
        const resultRows = await pool.query(sqlQuery, []);

        const query = {
            title: 'Quantidade de Pacientes por Prioridade',
            data: resultRows,
            fields: ['Prioridade', 'Quantidade de Pacientes'],
        }
        res.status(200).render("index", query);
    } catch (error) {
        res.status(400).send(error.message);
    }
});