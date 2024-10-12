export async function loadAuthMiddleware(to, from, next) {
  const token = localStorage.getItem("token");

  if (token) {
    next();
  } else {
    next({ name: "login" });
  }
}
