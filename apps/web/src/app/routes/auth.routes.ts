import { Route } from '@angular/router';

import { AuthLayoutComponent } from '@flashcards/web/auth/ui/layout';

/* eslint-disable max-len */
export const authRoutes: Route[] = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('@flashcards/web/auth/login/page').then((modules) => modules.LoginPageComponent),
        data: {
          sitemap: {
            loc: '/auth/login',
          },
          meta: {
            title: 'Вход в приложение Flashcards',
            description: 'Вход в приложение Flashcards. Если вы в первый раз на сайте - нажмите "Зарегистрироваться"',
          },
        },
      },
      {
        path: 'register',
        loadComponent: () => import('@flashcards/web/auth/register/page').then((modules) => modules.RegisterPageComponent),
        data: {
          sitemap: {
            loc: '/auth/register',
          },
          meta: {
            title: 'Регистрация в сервисе Flashcards',
            description: 'Для регистрации укажите электронный адрес и ФИО. После введите код подтверждения и вы успешно зарегистрированны.',
          },
        },
      },
    ],
  },
];
/* eslint-enable max-len */
