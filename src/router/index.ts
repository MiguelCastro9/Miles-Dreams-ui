import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '@/views/Home.vue';
import Settings from '@/views/Settings.vue';
import Points from '@/views/Points.vue';
import Offers from '@/views/Offers.vue';
import Chat from '@/views/Chat.vue';
import TabsComponent from '@/components/TabsComponent.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue';

const routes = [
  { path: '/', redirect: '/tabs/home' },
  {
    path: '/tabs',
    component: TabsComponent,
    children: [
      {
        path: '/tabs/home',
        name: 'Home',
        component: Home
      },

      {
        path: '/tabs/settings',
        name: 'Settings',
        component: Settings
      },
      {
        path: '/tabs/points',
        name: 'Points',
        component: Points
      },
      {
        path: '/tabs/offers',
        name: 'Offers',
        component: Offers
      },
      {
        path: '/tabs/chat',
        name: 'Chat',
        component: Chat
      },
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
