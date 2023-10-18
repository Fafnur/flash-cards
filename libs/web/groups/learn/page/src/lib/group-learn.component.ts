import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-group-learn',
  templateUrl: './group-learn.component.html',
  styleUrls: ['./group-learn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class GroupLearnComponent {}
