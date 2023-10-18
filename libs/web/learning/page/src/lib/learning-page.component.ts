import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GroupListComponent } from '@flashcards/web/groups/ui/list';

@Component({
  selector: 'flashcards-learning-page',
  templateUrl: './learning-page.component.html',
  styleUrls: ['./learning-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, GroupListComponent],
})
export class LearningPageComponent {}
