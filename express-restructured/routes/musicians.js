const express = require('express');
const router = express.Router(); //no longer have app object when separating out our routes

const musicians = [
    { id: 1, name: 'Phoebe Bridgers' },
    { id: 2, name: 'Wolf Alice' },
    { id: 3, name: 'Cherry Glazerr' },
    { id: 4, name: 'L.A. Witch'},
    { id: 5, name: 'Death Valley Girls' },
];

router.get('/', (req, res) => {
    res.send(musicians);
});

router.get("/:id", (req, res) => {
    const musician = musicians.find((m) => m.id === parseInt(req.params.id));
    if (!musician)
        return res
            .status(404)
            .send("The musician with the given id was not found.");
    res.send(musician);
});

router.post("/", (req, res) => {
    const { error } = validateMusician(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const musician = {
        id: musicians.length + 1,
        name: req.body.name,
    };
    musicians.push(musician);
    res.send(musician);
});

router.put("/:id", (req, res) => {
    const musician = musicians.find((m) => m.id === parseInt(req.params.id));
    if (!musician)
        return res
            .status(404)
            .send("The musician with the given id was not found.");

    const { error } = validateMusician(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    musician.name = req.body.name;

    res.send(musician);
});

function validateMusician(musician) {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    return Joi.validate(musician, schema);
}

router.delete("/:id", (req, res) => {
    const musician = musicians.find((m) => m.id === parseInt(req.params.id));
    if (!musician)
        return res
            .status(404)
            .send("The musician with the given id was not found.");

    const index = musicians.indexOf(musician);
    musicians.splice(index, 1);

    res.send(musician);
});

module.exports = router;