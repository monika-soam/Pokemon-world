import {
  addLike,
  createApp,
  getLikes,
  getComments,
  putComment,
} from './modules/involvement.js';
import './style.css';

let myApp;
let pageNumber = 1;
const pokeContainer = document.getElementById('pokemons');
const from = document.getElementById('from');
const to = document.getElementById('to');
const total = document.getElementById('total');
const pokemonsNumber = 9;
const maxPokemons = 980;
let openedOverlayID;
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
  const start = (pageNumber * pokemonsNumber) - 8;
  from.innerHTML = start.toString();
  to.innerHTML = (start + pokemonsNumber - 1).toString();
  total.innerHTML = maxPokemons.toString();
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
  const likeBtn = document.querySelectorAll('.heartbtn');

  for (let i = 0; i < likeBtn.length; i += 1) {
    likeBtn[i].addEventListener('click', (e) => {
      const el = e.target.parentNode.parentNode.parentNode.children[3].children[1].children[0];
      const elem = document.getElementById(el.id);
      addLike(el.id);
      elem.innerHTML = parseInt(elem.innerHTML, 10) + 1;
    });
  }

  const commentBtn = document.querySelectorAll('.commentBtn');
  for (let i = 0; i < commentBtn.length; i += 1) {
    commentBtn[i].addEventListener('click', (e) => {
      const el = e.target.parentNode.children[3].children[1].children[0];
      /* eslint-disable-next-line */
      fillOverlay(el.id);
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
  <div class="pokebox">

  <!-- This is the top part of the card -->
  
  <div class="pokehead">
    <span class="blue-circle"></span>
    <span class="red-circle"></span>
<span class="yellow-circle"></span>
<span class="green-circle"></span>
</div>
  
<!-- This is middle section of the card -->
  
<div class="pokebody">
<div class="poke-gray">
<div class="circle-container">
<span class="circle"></span>
<span class="circle"></span>
</div>
<div class="poke-container" id="background">
<div class="image-container">
<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png' alt='${name}'>
</div>
</div>
<div class="box-buttons">
<span class="circle2"></span>
<img src="https://i.imgur.com/rAT6iK5.png" alt="" class="burger">
</div>
</div>
</div>
  
<!-- This is the bottom part of the card -->
  
<div class="pokein">
<div class="pokename">
${name}
</div>
<button type="button" class="heartbtn">
<i class='fa fa-heart' aria-hidden='true'></i>
</button>
</div>
  
<div class="pokein2">
<div class="id">
<span class='number'>#${pokemon.id.toString().padStart(3, '0')}</span>
</div>
<div class="likeCount" id="countBox">
<span class="count" id='${pokemon.id}'> 0 </span>&nbsp; Likes
</div>
</div>
  
<button type="button" class="commentBtn" >Comments</button>

  </div>
  `;
  pokemonEl.innerHTML = pokeInnerHTML;
  pokeContainer.appendChild(pokemonEl);
}

const listComments = async (id) => {
  getComments(id).then((comments) => {
    document.getElementById('total-comments').innerHTML = '0 Dynamic Comment Count';

    document.getElementById('comments_rows').innerHTML = '';
    if (comments.length === 0) return;
    if (comments.length > 1) { document.getElementById('total-comments').innerHTML = `${comments.length.toString()} Dynamic Comments Count`; } else { document.getElementById('total-comments').innerHTML = `${comments.length.toString()} Dynamic Comment Count`; }
    comments.forEach((comment, i) => {
      document.getElementById('comments_rows').innerHTML += `<tr>
                    <th>${i + 1}</th>
                    <th>${comment.username}</th>
                    <th>${comment.comment}</th>
                    <th>${comment.creation_date}</th>
                  </tr>`;
    });
  });
};

const addComment = async (id) => {
  await putComment(id, document.getElementById('username').value, document.getElementById('comment').value);
  document.getElementById('username').value = '';
  document.getElementById('comment').value = '';
  listComments(openedOverlayID);
};
const fillOverlay = async (id) => {
  document.getElementsByClassName('overlay')[0].style.display = 'block';

  // fetch all details
  openedOverlayID = id;
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  document.getElementById('pokemon_img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  document.getElementById('pokemon_img').alt = `${pokemon.name}`;
  listComments(id);
};
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

  document.getElementById('addComment').addEventListener('click', () => {
    addComment(openedOverlayID);
  });

  document.getElementById('close').addEventListener('click', () => {
    openedOverlayID = 0;
    document.getElementsByClassName('overlay')[0].style.display = 'none';
  });
};