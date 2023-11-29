import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GroupListComponent } from '@flashcards/web/groups/ui/list';
import { TitleComponent } from '@flashcards/web/ui/title';

@Component({
  selector: 'flashcards-learning-page',
  templateUrl: './learning-page.component.html',
  styleUrls: ['./learning-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GroupListComponent, TitleComponent],
})
export class LearningPageComponent {}
