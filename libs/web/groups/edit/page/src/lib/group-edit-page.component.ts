import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-group-edit-page',
  templateUrl: './group-edit-page.component.html',
  styleUrls: ['./group-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class GroupEditPageComponent {}
