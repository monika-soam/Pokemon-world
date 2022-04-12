import { addLike, createApp, getLikes } from './modules/involvement.js';
import './style.css';
/* eslint-disable-next-line */
import l2800c94450c7829717d5 from './logo.png';

let myApp;
let pageNumber = 1;
const pokeContainer = document.getElementById('pokemons');
const pokemonsNumber = 15;
const maxPokemons = 980;
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
  pokeContainer.innerHTML = '';
  const start = (pageNumber * pokemonsNumber) - 14;
  for (let i = start; i < (start + pokemonsNumber); i += 1) {
    /* eslint-disable-next-line */
    await getPokemon(i);
  }

  getLikes().then((likes) => {
    likes.forEach((like) => {
      try {
        document.getElementById(like.item_id).innerHTML = like.likes;
      } catch (e) { /* eslint-disable-next-line */ }
    });
  });
  const likeBtn = document.querySelectorAll('.like-btn');

  for (let i = 0; i < likeBtn.length; i += 1) {
    likeBtn[i].addEventListener('click', (e) => {
      addLike(e.target.parentNode.children[0].children[0].id);
      e.target.children[0].innerHTML = parseInt(e.target.children[0].innerHTML, 10) + 1;
    });
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  /* eslint-disable-next-line */
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
            <i class='fa fa-heart' aria-hidden='true'>&nbsp;<span id='${pokemon.id}'>0</span>&nbsp;Like</i>
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
window.onload = () => {
  myApp = localStorage.getItem('myApp');
  if (myApp === undefined || myApp === null) {
    // Add a new App using Involvement API
    createApp().then((appID) => {
      localStorage.setItem('myApp', appID);
      myApp = appID;
    });
  }
  fetchPokemons();

  document.getElementById('prev').addEventListener('click', () => {
    if (pageNumber >= 2) {
      pageNumber -= 1;
      fetchPokemons();
    }
  });

  document.getElementById('next').addEventListener('click', () => {
    if ((maxPokemons / pokemonsNumber) > pageNumber) {
      pageNumber += 1;
      fetchPokemons();
    }
  });
};