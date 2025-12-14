import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import ProjectsList from "../views/ProjectsList.vue";
import ProjectDetail from "../views/ProjectDetail.vue";
import ProjectForm from "../views/ProjectForm.vue";
import TaskForm from "../views/TaskForm.vue";

const routes = [
  // PUBLIC ROUTES
  {
    path: "/login",
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: "/register",
    component: Register,
    meta: { requiresAuth: false }
  },

  // PROTECTED ROUTES
  {
    path: "/",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/projects",
    component: ProjectsList,
    meta: { requiresAuth: true }
  },
  {
    path: "/projects/new",
    component: ProjectForm,
    meta: { requiresAuth: true }
  },
  {
    path: "/projects/:id",
    component: ProjectDetail,
    meta: { requiresAuth: true }
  },
  {
    path: "/projects/:id/tasks/new",
    component: TaskForm,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ROUTER GUARD FIXED
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // Jika route butuh login tapi token tidak ada → redirect ke login
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // Jika sudah login dan membuka /login atau /register → redirect ke dashboard
  if ((to.path === "/login" || to.path === "/register") && token) {
    return next("/");
  }

  return next();
});

export default router;
