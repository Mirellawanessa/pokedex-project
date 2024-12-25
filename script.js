const pokemonList = document.getElementById('list');
const searchInput = document.getElementById('search');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonType = document.getElementById('pokemon-type');
const pokemonAbilities = document.getElementById('pokemon-abilities');
const pokemonImage = document.getElementById('pokemon-image');

// Função para carregar a lista de Pokémon
async function fetchPokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();

  pokemonList.innerHTML = '';
  data.results.forEach((pokemon, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${pokemon.name}`;
    listItem.addEventListener('click', () => fetchPokemonDetails(index + 1));
    pokemonList.appendChild(listItem);
  });
}

// Função para exibir detalhes de um Pokémon
async function fetchPokemonDetails(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  pokemonName.textContent = data.name;
  pokemonId.textContent = data.id;
  pokemonType.textContent = data.types.map(type => type.type.name).join(', ');
  pokemonAbilities.textContent = data.abilities.map(ability => ability.ability.name).join(', ');
  pokemonImage.src = data.sprites.front_default;
}

// Função de busca
searchInput.addEventListener('input', async () => {
  const searchTerm = searchInput.value.toLowerCase();
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();

  const filteredPokemon = data.results.filter(pokemon => pokemon.name.includes(searchTerm));
  pokemonList.innerHTML = '';

  filteredPokemon.forEach((pokemon, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${pokemon.name}`;
    listItem.addEventListener('click', () => fetchPokemonDetails(index + 1));
    pokemonList.appendChild(listItem);
  });
});

fetchPokemonList();
