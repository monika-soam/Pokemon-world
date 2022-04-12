import './style.css';
import listItem from "./modules/itemList.js"
import { createApp, addLike, getLikes } from "./modules/Involvement.js"
const content = document.getElementById("content");
window.onload = () => {

  //Check if you have an application in localstorage
  let myApp = localStorage.getItem("myApp");
  if (myApp === undefined || myApp === null) {
    //Call API to create App using Involvement 
    createApp(myApp).then(appName => {
      localStorage.setItem('myApp', appName);
      myApp = appName;
    });
  }
  listItem().then((html) => {
    content.innerHTML = html;
    let likes = document.getElementsByClassName('like-me');
    for (let i = 0; i < likes.length; i += 1) {
      likes[i].addEventListener('click', (e) => {
        let id = e.target.parentNode.parentNode.parentNode.id;
        addLike(id);
        e.target.parentNode.children[1].innerHTML = parseInt(e.target.parentNode.children[1].innerHTML) + 1;
      })
    }
    getLikes().then(likesFromAPI => {
        for (let i = 0; i < likesFromAPI.length; i += 1) {
          try {
            document.getElementById(likesFromAPI[i].item_id).children[1].children[0].children[1].innerHTML = likesFromAPI[i].likes;
          } catch (e) {

          }
        }

      })
      // for (let i = 0; i < likes.length; i += 1) {

    //     let id = e.target.parentNode.parentNode.parentNode.id;
    //     addLike(id);
    //     e.target.parentNode.children[1].innerHTML = parseInt(e.target.parentNode.children[1].innerHTML) + 1;
    // }
  });
}