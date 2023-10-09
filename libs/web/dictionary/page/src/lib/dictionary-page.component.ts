import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-dictionary-page',
  templateUrl: './dictionary-page.component.html',
  styleUrls: ['./dictionary-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class DictionaryPageComponent {}
