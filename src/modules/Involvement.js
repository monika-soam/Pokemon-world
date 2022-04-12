const createApp = async() => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/`, {
    method: 'POST',
  });
  const r = await response.text();
  return r;
};

const addLike = async(item_id) => {
  let raw = {
    "item_id": item_id
  }
  raw = JSON.stringify(raw);
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${localStorage.getItem("myApp")}/likes/`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: raw
  });
  const r = await response.text();
  console.log(r);
}

const getLikes = async() => {

  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${localStorage.getItem("myApp")}/likes/`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  });
  const r = await response.json();
  return r;
}

export {
  createApp,
  addLike,
  getLikes
};