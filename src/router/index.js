import { createRouter, createWebHistory } from "vue-router";
import { loadLayoutMiddleware } from "./middleware/loadLayoutMiddleware";
import { loadAuthMiddleware } from "./middleware/loadAuthMiddleware";
import { loadGuestMiddleware } from "./middleware/loadGuestMiddleware";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        layout: "DashboardLayout",
        middleware: "auth",
      },
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: {
        middleware: "guest",
      },
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: {
        middleware: "guest",
      },
      component: () => import("../views/RegisterView.vue"),
    },
  ],
});

// router.beforeEach(loadLayoutMiddleware)

router.beforeEach(async (to, from, next) => {
  await loadLayoutMiddleware(to);

  if (to.meta.middleware === "auth")
    await loadAuthMiddleware(to, from, next);
  else if (to.meta.middleware === "guest")
    await loadGuestMiddleware(to, from, next);
  else
    next();
});

export default router;
