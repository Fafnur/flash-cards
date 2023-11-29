import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { SettingsLogoutComponent } from '@flashcards/web/settings/ui/logout';
import { TitleComponent } from '@flashcards/web/ui/title';

@Component({
  selector: 'flashcards-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TitleComponent, MatCardModule, SettingsLogoutComponent],
})
export class SettingPageComponent {}
