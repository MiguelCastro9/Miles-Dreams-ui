import { createRouter, createWebHistory } from '@ionic/vue-router';
import Offers from '@/views/Offers.vue';
import Points from '@/views/Points.vue';
import Settings from '@/views/Settings.vue';
import TabsComponent from '@/components/TabsComponent.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue';
import Login from '@/views/Login.vue';

const routes = [
  { path: '/', redirect: '/tabs/offers' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/tabs',
    component: TabsComponent,
    children: [
      {
        path: '/tabs/offers',
        name: 'Offers',
        component: Offers,
        meta: { requiresAuth: true }
      },
      {
        path: '/tabs/points',
        name: 'Points',
        component: Points,
        meta: { requiresAuth: true }
      },
      {
        path: '/tabs/settings',
        name: 'Settings',
        component: Settings,
        meta: { requiresAuth: true }
      }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, _, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
