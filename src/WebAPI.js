const BASE_URL = "https://student-json-api.lidemy.me";

export const getPosts = (perPage, page) => {
  let url = BASE_URL + "/posts?";
  let query = {
    _sort: "createdAt",
    _order: "desc",
    _limit: perPage,
    _page: page,
    _expand: "user",
  };
  let queryString = [];
  for (let key in query) {
    queryString.push(`${key}=${encodeURIComponent(query[key])}`);
  }
  url += queryString.join("&");
  return fetch(url);
};

export const getMyPosts = (userId, perPage, page) => {
  let url = BASE_URL + "/posts?";
  let query = {
    _sort: "createdAt",
    _order: "desc",
    userId,
    _limit: perPage,
    _page: page,
    _expand: "user",
  };
  let queryString = [];
  for (let key in query) {
    queryString.push(`${key}=${encodeURIComponent(query[key])}`);
  }
  url += queryString.join("&");
  return fetch(url);
};
export const getOnePost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}&_expand=user`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Fail to fetch");
      }
    })
    .catch((err) => err);
};

export const register = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Fail to register");
      }
    })
    .catch((err) => err);
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Fail to register");
      }
    })
    .catch((err) => err);
};

export const getMe = () => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Fail to get user");
      }
    })
    .catch((err) => err);
};

export const publishPost = (title, body) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Fail to publish");
      }
    })
    .catch((err) => err);
};

export const editPost = (id, title, body) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Fail to edit");
      }
    })
    .catch((err) => err);
};

export const deletePost = (postId) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Fail to delete");
      }
    })
    .catch((err) => err);
};
