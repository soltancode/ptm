export async function loadGuestMiddleware(to, from, next) {
  const token = localStorage.getItem("token");

  if (token) {
    next({ name: "home" });
  } else {
    next();
  }
}
