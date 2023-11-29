import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { GroupCreateComponent } from '@flashcards/web/groups/ui/create';
import { GroupListComponent } from '@flashcards/web/groups/ui/list';
import { ProfileFormComponent } from '@flashcards/web/profile/ui/form';
import { SettingsLogoutComponent } from '@flashcards/web/settings/ui/logout';
import { TitleComponent } from '@flashcards/web/ui/title';

@Component({
  selector: 'flashcards-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GroupCreateComponent, GroupListComponent, MatCardModule, ProfileFormComponent, SettingsLogoutComponent, TitleComponent],
})
export class ProfilePageComponent {}
