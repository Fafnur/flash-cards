import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';

import { CardService } from '@flashcards/cards/services';
import { httpInterceptorProviders, LOCAL_DB_CONFIG, LocalDBConfig } from '@flashcards/core';
import { GroupService } from '@flashcards/groups/services';
import { UserService } from '@flashcards/users/services';

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
    provideHttpClient(withFetch(), withInterceptors(httpInterceptorProviders)),
    {
      provide: LOCAL_DB_CONFIG,
      useValue: {
        storeNames: ['users', 'groups', 'cards'],
        keyPath: 'uuid',
        version: 1,
      } as Partial<LocalDBConfig>,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (userService: UserService, groupService: GroupService, cardService: CardService) => {
        return () => {
          userService.init();
          const uuid = userService.uuid;
          if (uuid) {
            groupService.init(uuid);
            cardService.init(uuid);
          }
        };
      },
      multi: true,
      deps: [UserService, GroupService, CardService],
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
