const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;



function convertPokemonToLi(pokemon) {
    return `
        <div class="visivel">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>           
            </li>
            <div class="statusPokemon  ${pokemon.colorAbility}">
                <span class="title">Abilities</span>
                <div class="abilities">
                    <ol class="nameAbilities">
                        ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('') }                 
                    </ol>
                    <img src="/assets/img/${pokemon.type}.webp" alt="${pokemon.type}">
                </div>
                <span class="title">Status</span>
                <div class="stats">
                    <ol class="nameStats">
                        ${pokemon.stats.map((stat) => `<li class="stats">${stat} </li>`).join('') }  
                    </ol>    
                    <ol class="numberStats">       
                        ${pokemon.base_stats.map((base_stat) => `<li class="base_stats">${base_stat} </li>`).join('') }     
                    </ol>
                </div>    
                </ol>
            </div> 
        </div>
    `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
   
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})