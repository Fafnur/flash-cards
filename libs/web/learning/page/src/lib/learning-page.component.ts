import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-learning-page',
  templateUrl: './learning-page.component.html',
  styleUrls: ['./learning-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class LearningPageComponent {}
