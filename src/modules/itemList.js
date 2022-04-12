const listItemAPI = async(name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);

  const { meals } = await response.json();
  return meals;
};

const listItem = async() => {
  const newItemList = await listItemAPI("a");
  let displayList = '';
  for (let i = 0; i < newItemList.length; i += 1) {
    displayList += `<div class="inner-content" id="${newItemList[i].idMeal}">
    <img src="${newItemList[i].strMealThumb}" />
    <h1>${newItemList[i].strMeal}<span ><i class="fa fa-heart-o like-me" aria-hidden="true"></i>
    <span class="like">0</span> like
      </span></h1>
    <button type="button" class="comment">Comments</button>
    <button type="button" class="reservation">Reservations</button>
  </div>`;
  }
  return Promise.resolve(displayList);
};

export default listItem;