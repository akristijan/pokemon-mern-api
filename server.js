const express = require('express')
const app = express()
const PORT = 3001

//middleware
app.use(express.json());

//dummy data
let pokemons = [
    {
        id: 1,
        name: "bulbasaur",
        type: "poison",
        weakness: ["fire", "ice", "flying"]
    },
    {
        id: 2,
        name: "squirtle",
        type: "water",
        weakness: ["grass", "electric"]
    },
    {
        id: 3,
        name: "caterpie",
        type: "bug",
        weakness: ["fire", "rock", "flying"]
    },
    {
        id: 4,
        name: "ekans",
        type: "poison",
        weakness: ["psychic", "ground"]
    }
]

app.listen(process.env.PORT || PORT, (req, res) => {
    console.log(`The Server is now running on port ${PORT}`)
})

//route handlers
app.get('/', (req, res) => {
    res.send("<h1>Hello my Pokemon fan</h1>")
})

app.get('/api/pokemons', (req, res) => {
    res.json(pokemons)
})

//get pokemon by id
app.get('/api/pokemons/:id', (req, res) => {
    const pokemonID = Number(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === pokemonID )
    if(pokemon) {
        res.json(pokemon)
    }
    else {
        res.statusMessage = `Pokemon with that id ${pokemonID} does not exist!`
        res.status(404).end();
    }
})

//get pokemon by name
app.get('/api/pokemons/name/:name', (req, res) => {
    const pokemonName = req.params.name.toLowerCase();
    const pokemon = pokemons.find(pokemon => pokemon.name === pokemonName )
    if(pokemon) {
        res.json(pokemon)
    }
    else {
        res.statusMessage='Pokemon does not exist in DB'
        res.status(404).end();
    }
    
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = Number(req.params.id);
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    
    res.status(204).end()
})

//adding new Pokemon
app.post('/api/pokemons', (req, res) => {
    const body = req.body;
    const pokemonId = Math.ceil(Math.random() * 10000 + pokemons.length);
    if(!body.name) {
        return res.status(400).json({
            "error": "Name is missing"
        })
    }
    else if(!body.type) {
        return res.status(400).json({
            "error": "Type is missing"
        })
    }
    else if(!body.weakness) {
        return res.status(400).json({
            "error": "Weakness is missing"
        })
    }
    //create object to data from request body
    const pokemon = {
        id : pokemonId,
        important: body.important || false,
       name : body.name,
       type : body.type,
       weakness : body.weakness,
        date: new Date()
    }

    pokemons = pokemons.concat(pokemon)
    res.json(pokemons)
})
