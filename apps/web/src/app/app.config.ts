import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';

import { httpInterceptorProviders } from '@flashcards/core';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHttpClient(withInterceptors(httpInterceptorProviders)),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (metaService: MetaService, metricService: MetricService) => {
    //     return () => {
    //       metaService.init();
    //       metricService.init();
    //     };
    //   },
    //   multi: true,
    //   deps: [MetaService, MetricService],
    // },
  ],
};
