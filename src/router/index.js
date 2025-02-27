import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import InvestmentsView from '@/views/InvestmentsView.vue';
import ChartsView from '@/views/ChartsView.vue';
import AlertsView from '@/views/AlertsView.vue';
import NewsView from '@/views/NewsView.vue';
import ArticleView from '@/views/ArticleView.vue';
import ProfileView from '@/views/ProfileView.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: DashboardView },
      { path: 'dashboard', name: 'dashboard', component: DashboardView },
      { path: 'investments', name: 'investments', component: InvestmentsView },
      { path: 'charts', name: 'charts', component: ChartsView },
      { path: 'alerts', name: 'alerts', component: AlertsView },
      { path: 'blog', name: 'blog', component: NewsView },
      { path: 'article/:id', name: 'article', component: ArticleView, props: true },
      { path: 'profile', name: 'profile', component: ProfileView },
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'register', name: 'register', component: RegisterView },
      { path: 'login', name: 'login', component: LoginView },
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: DashboardView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
