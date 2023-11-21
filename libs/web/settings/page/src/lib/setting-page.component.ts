import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@flashcards/users/common';
import { UserService } from '@flashcards/users/services';

@Component({
  selector: 'flashcards-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, AsyncPipe],
})
export class SettingPageComponent {
  readonly user$: Observable<User> = inject(UserService).user$;
}
