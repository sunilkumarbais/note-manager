const Audit = () => {
  const BASE = import.meta.env.VITE_SERVER_URL;

  const register = async (data) => {
    return await fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userName: data.userName,
        email: data.email,
        password: data.password,
      }),
    });
  };
  const login = async (data) => {
    return await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userName: data.userName,
        email: data.email,
        password: data.password,
      }),
    });
  };

  const getProfile = () => {
    return fetch(`${BASE}/auth/profile`, {
      method: "GET",
      credentials: "include",
    });
  };

  const updateProfile = (data) => {
    return fetch(`${BASE}/auth/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userName: data.userName, email: data.email }),
    });
  };

  const checkUser = () => {
    return fetch(`${BASE}/auth/ckeck`, {
      method: "POST",
      credentials: "include",
    });
  };

  const adminUser = () => {
    return fetch(`${BASE}/auth/admin`, {
      method: "POST",
      credentials: "include",
    });
  };

  const logout = async () => {
    return await fetch(`${BASE}/auth/logout`, {
      method: "Post",
      credentials: "include",
    });
  };

  const createNote = async (data) => {
    return await fetch(`${BASE}/notes`, {
      method: "POST",
      credentials: "include",
      body: data,
    });
  };

  const getEachNote = async (id) => {
    return await fetch(`${BASE}/notes/${id}`, {
      method: "GET",
      credentials: "include",
    });
  };

  const getAllNote = async () => {
    return await fetch(`${BASE}/notes`, {
      method: "GET",
      credentials: "include",
    });
  };

  const updateNote = async (id, data) => {
    return await fetch(`${BASE}/notes/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: data,
    });
  };

  const deleteNote = (id) => {
    return fetch(`${BASE}/notes/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  };

  return {
    register,
    login,
    getProfile,
    updateProfile,
    checkUser,
    adminUser,
    logout,
    createNote,
    getEachNote,
    getAllNote,
    updateNote,
    deleteNote,
  };
};

export default Audit;
