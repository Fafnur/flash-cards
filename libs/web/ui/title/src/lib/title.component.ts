import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SizeDirective } from '@flashcards/core';

@Component({
  selector: 'flashcards-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-title',
  },
  hostDirectives: [
    {
      directive: SizeDirective,
      inputs: ['size'],
    },
  ],
})
export class TitleComponent {}
