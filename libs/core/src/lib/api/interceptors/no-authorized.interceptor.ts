import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LocalStorageAsync } from '../../storages/local/local-storage-async';

export const noAuthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageAsync = inject(LocalStorageAsync);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && req.url.indexOf('/users/info') < 0 && error.status === 401) {
        localStorageAsync.clear();
      }

      return throwError(() => error);
    }),
  );
};
