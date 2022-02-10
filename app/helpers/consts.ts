export const AUTH_CONSTS = {
  clientId: "c71461e148804cf4a6ce7faf6e421e69",
  clientSecret: "8f62d5ab87944514ad750458487d9be5",
  redirectUri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/callback"
      : "https://fuzzyfy.netlify.app/callback",
};

export const API_CONSTS = {
  apiUrl: "https://api.spotify.com/v1",
};
