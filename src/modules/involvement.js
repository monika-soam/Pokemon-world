const createApp = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
    method: 'POST',
  });
  const r = await response.text();
  return r;
};

const addLike = async (itemID) => {
  let raw = {
    item_id: itemID,
  };
  raw = JSON.stringify(raw);
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${localStorage.getItem('myApp')}/likes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: raw,
  });
  const res = await response.text();
  return res;
};

const getLikes = async () => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${localStorage.getItem('myApp')}/likes/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const res = await response.json();
  return res;
};

export { createApp, addLike, getLikes };