const db = require("../models");

module.exports = function (app) {

    
    app.get("/", function (req, res) {

        const handlebarsObj = {};

        const customers = db.Customer.findAll({})
        const burgers = db.Burger.findAll({})

        Promise
        .all([customers, burgers])
        .then(data => {
            handlebarsObj.customers = data[0];
            handlebarsObj.burgers = data[1];
            // res.json(handlebarsObj)
            res.render("index", handlebarsObj)
        })

    })

    app.post("/add/burger", function (req, res) {
        db.Burger.create({ burger_name: req.body.burger_name }).then(function (result) {
            res.status(200);
            res.json({ id: result.id });
        })

    })

    app.put("/update/burger", function (req, res) {
        db.Burger.update({ devoured: true }, {
            where: {
                id: req.body.id
            }
        })
            .then(function (result) {
                res.status(200);
                res.json({ id: result.id });
            })

        db.Customer.create({ name: req.body.customer_name, BurgerId: req.body.id }).then(function (result) {
            res.status(200);
        })

    });

}

