import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ProfilePageComponent {}
