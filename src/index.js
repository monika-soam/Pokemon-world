import './style.css';

const pokeContainer = document.getElementById('pokemons');
const pokemonsNumber = 908;
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};
const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonsNumber; i += 1) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  const pokeTypes = pokemon.types.map((type) => type.type.name);
  const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokeInnerHTML = `
        <div class='img-container'>
        <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png'' alt='${name}'>
        </div>
        <div class='info'>
            <span class='number'>#${pokemon.id
    .toString()
    .padStart(3, '0')}</span>
            <h3 class='name'>${name}</h3>
            <button class='like-btn'>
            <i class='fa fa-heart' aria-hidden='true'><span id='count'> 0 </span>Like</i>
            </button>
            <div class='buttons'>
                <button class='comment' id='btn'>Leave A Comment</button>
                <button class='reservation' id='btn'>Make A Reservation</button>
            </div>
        </div>
    `;

  pokemonEl.innerHTML = pokeInnerHTML;

  pokeContainer.appendChild(pokemonEl);
}

fetchPokemons();

const likeBtn = document.querySelectorAll('.like-btn');
const count = document.querySelector('#count');
let clicked = false;

likeBtn.addEventListener('click', () => {
  if (!clicked) {
    clicked = true;
    count.TextContent += 1;
  } else {
    clicked = false;
    count.TextContent -= 1;
  }
});
