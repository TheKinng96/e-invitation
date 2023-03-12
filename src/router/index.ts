import { createRouter, createWebHistory } from 'vue-router';
import { authRoute } from './auth.routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [...authRoute],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { top: 0 };
    }
  },
});

router.onError((error) => {
  if (/loading chunk \d* failed./i.test(error.message)) {
    // TODO - logout user and redirect to login page
  }
});

// eslint-disable-next-line
router.beforeEach(async (to: any, from: any, next: any) => {
  // Redirect not found to dashboard if login else login page
  if (!to.name) {
    next({ name: 'main' });
    return;
  }

  next();
});

export default router;
