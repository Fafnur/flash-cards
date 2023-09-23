import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-footer',
  },
})
export class FooterComponent {}
