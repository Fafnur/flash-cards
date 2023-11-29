import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';

import { ExtractTouchedDirective, FormChoice, LANG_OPTIONS, trackByFormChoice } from '@flashcards/core';

@Component({
  selector: 'flashcards-group-lang',
  templateUrl: './group-lang.component.html',
  styleUrls: ['./group-lang.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, AsyncPipe, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, ExtractTouchedDirective],
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
export class GroupLangComponent implements OnInit {
  @Input({ required: true }) control!: FormControl<string>;
  @Input({ required: true }) label!: string;

  readonly options = LANG_OPTIONS;

  filteredOptions$!: Observable<FormChoice<string>[]>;

  trackByFn = trackByFormChoice;

  ngOnInit() {
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map((value: string | number | FormChoice) => {
        const name = typeof value === 'string' || typeof value === 'number' ? value : value.label;
        if (name) {
          return this.filterResult(name);
        }

        return this.options;
      }),
    );
  }

  displayFn(choice: number | string): string {
    return LANG_OPTIONS.find((item) => item.value === choice)?.label ?? '';
  }

  onClose(): void {
    const choice = this.options.find((option) => option.value === this.control.value);

    if (!choice) {
      const options = this.filterResult(this.control.value);
      if (options.length === 1) {
        this.control.patchValue(options[0].value);
      } else {
        this.control.setErrors({ invalid: true });
      }
    }
  }

  private filterResult(state: string | number): FormChoice<string>[] {
    return this.options.filter((option) => option.label.toLowerCase().indexOf(state.toString().toLowerCase()) === 0);
  }
}
