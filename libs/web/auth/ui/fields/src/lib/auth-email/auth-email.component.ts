import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ExtractTouchedDirective } from '@flashcards/core';

@Component({
  selector: 'flashcards-auth-email',
  templateUrl: './auth-email.component.html',
  styleUrls: ['./auth-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatInputModule, MatFormFieldModule, ExtractTouchedDirective],
})
export class AuthEmailComponent {
  @Input({ required: true }) control!: FormControl<string>;
}
