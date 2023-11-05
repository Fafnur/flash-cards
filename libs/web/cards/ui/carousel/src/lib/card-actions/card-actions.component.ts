import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'flashcards-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule],
})
export class CardActionsComponent {
  @Output() learned = new EventEmitter<boolean>();

  onLearn(learned: boolean): void {
    this.learned.emit(learned);
  }
}
