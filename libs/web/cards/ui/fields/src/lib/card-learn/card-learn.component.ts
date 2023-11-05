import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'flashcards-card-learn',
  templateUrl: './card-learn.component.html',
  styleUrls: ['./card-learn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatCheckboxModule, ReactiveFormsModule],
})
export class CardLearnComponent {
  @Input({ required: true }) control!: FormControl<boolean>;
}
