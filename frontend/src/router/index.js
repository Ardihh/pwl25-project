import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import ProjectsList from "../views/ProjectsList.vue";
import ProjectDetail from "../views/ProjectDetail.vue";
import ProjectForm from "../views/ProjectForm.vue";
import TaskForm from "../views/TaskForm.vue";

const routes = [
  // PUBLIC 
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },

  // ROOT (SMART REDIRECT) 
  {
    path: "/",
    redirect: () => {
      const role = localStorage.getItem("role");
      return role === "admin" ? "/admin/dashboard" : "/dashboard";
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
        path: "projects/:id/tasks/edit",
        component: () => import("../views/admin/AdminProjectEdit.vue")
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

// ROUTER GUARD (Letakkan SETELAH inisialisasi const router)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.token; // Gunakan nama variabel yang benar (authStore)
  const role = authStore.role;

  // 1. Butuh login tapi tidak ada token
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // 2. Akses halaman admin tapi bukan admin
  if (to.meta.role === "admin" && role !== "admin") {
    return next("/dashboard");
  }

  // 3. Sudah login tapi mencoba buka login/register
  if ((to.path === "/login" || to.path === "/register") && token) {
    return role === "admin" ? next("/admin/dashboard") : next("/dashboard");
  }

  next();
});

export default router;