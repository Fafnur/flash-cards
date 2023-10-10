import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { LocalStorageSync } from '../../storages/local/local-storage-sync';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageSync: LocalStorageSync<{ auth: { accessToken: string } }> = inject(LocalStorageSync);
  const response = localStorageSync.getItem('auth');

  if (response) {
    req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${response.accessToken}`) });
  }

  return next(req);
};
