import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NoGutterDirective } from './no-gutter.directive';

@Component({
  selector: 'flashcards-row',
  template: '<ng-content></ng-content>',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'fafn-row',
  },
  hostDirectives: [
    {
      directive: NoGutterDirective,
      inputs: ['no-gutter'],
    },
  ],
})
export class RowComponent {}
