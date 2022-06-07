const express = require('express')
const app = express()
const PORT = 3001

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

app.get('/pokemons', (req, res) => {
    res.json(pokemons)
})

//get pokemon by id
app.get('/pokemons/:id', (req, res) => {
    const pokemonID = Number(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === pokemonID )
    if(pokemon) {
        res.json(pokemon)
    }
    else {
        res.status(404).end();
    }
})

//get pokemon by name
app.get('/pokemons/name/:name', (req, res) => {
    const pokemonName = req.params.name.toLowerCase();
    const pokemon = pokemons.find(pokemon => pokemon.name === pokemonName )
    console.log(pokemon)
    res.json(pokemon)
})
