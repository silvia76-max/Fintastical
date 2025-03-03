import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import InvestmentsView from '@/views/InvestmentsView.vue'
import ChartsView from '@/views/ChartsView.vue'
import AlertsView from '@/views/AlertsView.vue'
import NewsView from '@/views/NewsView.vue'
import ArticleView from '@/views/ArticleView.vue'
import ProfileView from '@/components/auth/ProfileView.vue'
import NotFoundView from '@/views/NotFoundView.vue' // Componente para la página 404

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: { requiresAuth: true },
      },
      { path: 'investments', name: 'investments', component: InvestmentsView },
      { path: 'charts', name: 'charts', component: ChartsView },
      { path: 'alerts', name: 'alerts', component: AlertsView },
      { path: 'blog', name: 'blog', component: NewsView },
      { path: 'article/:id', name: 'article', component: ArticleView, props: true },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
      { path: 'register', name: 'register', component: RegisterView },
      { path: 'login', name: 'login', component: LoginView },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView, // Página 404 personalizada
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guardián de seguridad (como portero de discoteca)
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('auth/login')
  } else {
    next()
  }
})

export default router
