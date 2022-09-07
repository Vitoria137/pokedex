const pokemonName = document.querySelector('#name')
const pokemonId = document.querySelector('#cod')
const pokemonImage = document.querySelector('#img')
const pokemonHP = document.querySelector('#xp')

const prev = document.querySelector('#prev')
const next = document.querySelector('#next')

const form = document.querySelector('#form')
const input = document.querySelector('#input')

let APIStart = 1

const APIPokemon = async (pokemon) => {
    const pokemonFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(pokemonFetch.status === 200){
    const data = await pokemonFetch.json();
    return data
    }
}

const APIRender = async (pokemon) => {
    pokemonName.textContent = 'Load'
    pokemonId.textContent = ''

    const data = await APIPokemon(pokemon)
    
    if(data){
        pokemonName.textContent = data.name;
        pokemonId.textContent = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        APIStart = data.id
    }else{
        pokemonId.textContent = '';
        pokemonName.textContent = 'Not Found'
        pokemonImage.style.display = 'none'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    APIRender(input.value.toLowerCase())
    input.value = ''
})

next.addEventListener('click', () => {
    APIStart += 1;
    APIRender(APIStart)
})

prev.addEventListener('click', () => {
    if(APIStart > 1){
        APIStart -= 1;
        APIRender(APIStart)
    }
})

APIRender(APIStart)