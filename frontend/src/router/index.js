import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import ProjectsList from "../views/ProjectsList.vue";
import ProjectDetail from "../views/ProjectDetail.vue";
import ProjectForm from "../views/ProjectForm.vue";
import TaskForm from "../views/TaskForm.vue";

const routes = [
  // PUBLIC 
  { path: "/login", component: Login },
  { path: "/register", component: Register },

  // ROOT (SMART REDIRECT) 
  {
    path: "/",
    redirect: () => {
      const role = localStorage.getItem("role");
      return role === "admin" ? "/admin/AdminDashboard" : "/dashboard";
    }
  },

  // USER 
  {
    path: "/dashboard",
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
  },

  // ADMIN 
  {
    path: "/admin",
    meta: { requiresAuth: true, role: "admin" },
    children: [
      {
        path: "dashboard",
        component: () => import("../views/admin/AdminDashboard.vue")
      },
      {
        path: "projects",
        component: () => import("../views/admin/AdminProjects.vue")
      },
      {
        path: "projects/:id",
        component: () => import("../views/admin/AdminProjectDetail.vue")
      },
      {
        path: "users",
        component: () => import("../views/admin/AdminUsers.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ROUTER GUARD
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // butuh login
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }
  // butuh admin
  if (to.meta.role === "admin" && role !== "admin") {
    return next("/");
  }
  // admin ke "/" → redirect ke admin dashboard
  if (to.path === "/" && role === "admin") {
    return next("/admin/dashboard");
  }
  // sudah login buka login/register
  if ((to.path === "/login" || to.path === "/register") && token) {
    return role === "admin"
      ? next("/admin/dashboard")
      : next("/");
  }
  next();
});

export default router;
