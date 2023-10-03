import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { ExtractTouchedDirective, LANG_OPTIONS } from '@flashcards/core';

@Component({
  selector: 'flashcards-group-lang',
  templateUrl: './group-lang.component.html',
  styleUrls: ['./group-lang.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, MatSelectModule, ExtractTouchedDirective],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-group-lang',
  },
  hostDirectives: [
    {
      directive: ExtractTouchedDirective,
      inputs: ['control'],
    },
  ],
})
export class GroupLangComponent {
  @Input() control!: FormControl<string>;
  @Input() label!: string;

  readonly options = LANG_OPTIONS;
}
