const db = require("../models/db")
const Calculator = db.Calculator;

const saveResult = async (req, res) => {
    const num = {
        result: req.params.num
    }

    Calculator.create(num)
    .then(() => {
        res.status(200).send("OK");
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send(false);
    });
};

const getResultList = async (req, res) => {
    // result column만
    const results = await Calculator.findAll({attributes: ['result']})
    .then(() => {
        res.status(200).send(results);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send(false);
    });
};


const deleteResult = async (req, res) => {
    Calculator.destroy()
    .then(() => {
        res.status(200).send("Delete successfully!");
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send(false);
    });
}


module.exports = {
    saveResult,
    getResultList,
    deleteResult
}