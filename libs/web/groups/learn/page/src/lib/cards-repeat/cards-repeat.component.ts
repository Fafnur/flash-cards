import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'flashcards-cards-repeat',
  templateUrl: './cards-repeat.component.html',
  styleUrls: ['./cards-repeat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
})
export class CardsRepeatComponent {
  @Output() repeated = new EventEmitter<void>();

  onRepeat(): void {
    this.repeated.emit();
  }
}
