import { HttpInterceptorFn } from '@angular/common/http';

import { contentTypeInterceptor } from './content-type.interceptor';
// import { frontRequestIdInterceptor } from './front-request-id.interceptor';
import { noAuthorizedInterceptor } from './no-authorized.interceptor';
import { tokenInterceptor } from './token.interceptor';
// import { visitorInterceptor } from './visitor.interceptor';

export const httpInterceptorProviders: HttpInterceptorFn[] = [
  contentTypeInterceptor,
  // frontRequestIdInterceptor,
  // visitorInterceptor,
  noAuthorizedInterceptor,
  tokenInterceptor,
];
