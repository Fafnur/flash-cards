import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FluidDirective } from './fluid.directive';
import { MobileDirective } from './mobile.directive';

@Component({
  selector: 'flashcards-container',
  template: '<ng-content></ng-content>',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-container',
  },
  hostDirectives: [
    {
      directive: FluidDirective,
      inputs: ['fluid'],
    },
    {
      directive: MobileDirective,
      inputs: ['mobile'],
    },
  ],
})
export class ContainerComponent {}
