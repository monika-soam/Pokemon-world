const createApp = async() => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
    method: 'POST',
  });
  const r = await response.text();
  return r;
};

const addLike = async(itemID) => {
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

const getLikes = async() => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${localStorage.getItem('myApp')}/likes/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const res = await response.json();
  return res;
};

const getComments = async(id) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${localStorage.getItem('myApp')}/comments?item_id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await response.json();
    if (res.error) return [];
    return res;
  } catch (e) { /* eslint-disable-next-line */
    return []
  }
};

const putComment = async(id, username, comment) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/yF5zxJtwKDf1L72mEvjU/comments?item_id=${id}`;
  const raw = {
    username,
    comment,
    item_id: id,
  };
  /* eslint-disable-next-line */
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(raw),
    headers: { 'Content-Type': 'application/json' },
  });
};

export {
  createApp,
  addLike,
  getLikes,
  getComments,
  putComment,
};