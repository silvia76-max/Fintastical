import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import HomeView from '@/views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import InvestmentsView from '@/views/InvestmentsView.vue';
import ChartsView from '@/views/ChartsView.vue';
import AlertsView from '@/views/AlertsView.vue';
import NewsView from '@/views/NewsView.vue';
import ArticleView from '@/views/ArticleView.vue';
import ProfileView from '@/components/auth/ProfileView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import CookiePolicy from '@/views/CookiePolicy.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';
import RegulationLicense from '@/views/RegulationLicense.vue';
import TermsConditions from '@/views/TermsConditions.vue';
import GeneralRiskDisclosure from '@/views/GeneralRiskDisclosure.vue';
import KeyInformationDocuments from '@/views/KeyInformationDocuments.vue';
import AboutUs from '@/views/AboutUs.vue';
import ContactForm from '@/views/ContactForm.vue';
import WhyChooseFintastical from '@/views/WhyChooseFintastical.vue';
import FintasticalReviews from '@/views/FintasticalReviews.vue';
import OurOffices from '@/views/OurOffices.vue';
import Accessibility from '@/views/Accessibility.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
      { path: 'investments', name: 'investments', component: InvestmentsView },
      { path: 'charts', name: 'charts', component: ChartsView },
      { path: 'alerts', name: 'alerts', component: AlertsView },
      { path: 'blog', name: 'blog', component: NewsView },
      { path: 'article/:id', name: 'article', component: ArticleView, props: true },
      { path: 'about-us', name: 'about-us', component: AboutUs },
      { path: 'cookie-policy', name: 'cookie-policy', component: CookiePolicy },
      { path: 'privacy-policy', name: 'privacy-policy', component: PrivacyPolicy },
      { path: 'regulation-license', name: 'regulation-license', component: RegulationLicense },
      { path: 'terms-conditions', name: 'terms-conditions', component: TermsConditions },
      { path: 'general-risk-disclosure', name: 'general-risk-disclosure', component: GeneralRiskDisclosure },
      { path: 'key-information-documents', name: 'key-information-documents', component: KeyInformationDocuments },
      { path: 'contact', name: 'contact', component: ContactForm },
      // Nuevas rutas para la sección de FAQ
      { path: 'why-choose-fintastical', name: 'why-choose-fintastical', component: WhyChooseFintastical },
      { path: 'fintastical-reviews', name: 'fintastical-reviews', component: FintasticalReviews },
      { path: 'our-offices', name: 'our-offices', component: OurOffices },
      { path: 'accessibility', name: 'accessibility', component: Accessibility },
    ]
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
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory('/Fintastical/'),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('auth/login');
  } else {
    next();
  }
});

export default router;
