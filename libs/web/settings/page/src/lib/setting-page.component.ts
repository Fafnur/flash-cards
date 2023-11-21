import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class SettingPageComponent {}
