import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HandsetDirective } from './handset.directive';
import { TabletDirective } from './tablet.directive';
import { WebDirective } from './web.directive';

@Component({
  selector: 'flashcards-column',
  template: '<ng-content></ng-content>',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-column',
  },
  hostDirectives: [
    {
      directive: HandsetDirective,
      inputs: ['handset', 'handset-offset'],
    },
    {
      directive: TabletDirective,
      inputs: ['tablet', 'tablet-offset'],
    },
    {
      directive: WebDirective,
      inputs: ['web', 'web-offset'],
    },
  ],
})
export class ColumnComponent {}
