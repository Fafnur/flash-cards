import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ContainerComponent } from '@flashcards/web/ui/container';

import { CopyrightComponent } from './copyright/copyright.component';

@Component({
  selector: 'flashcards-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ContainerComponent, CopyrightComponent],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-footer',
  },
})
export class FooterComponent {}
