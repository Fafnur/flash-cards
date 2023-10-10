import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';

import { httpInterceptorProviders, LOCAL_DB_CONFIG, LocalDBConfig } from '@flashcards/core';

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
      withComponentInputBinding(),
    ),
    provideHttpClient(withInterceptors(httpInterceptorProviders)),
    {
      provide: LOCAL_DB_CONFIG,
      useValue: {
        storeNames: ['users', 'groups', 'cards'],
        keyPath: 'uuid',
        version: 1,
      } as Partial<LocalDBConfig>,
    },
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
