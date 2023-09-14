import { ChangeDetectorRef, DestroyRef, Directive, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { extractTouchedChanges } from '../operators/extract.operator';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[extractTouched]',
  standalone: true,
})
export class ExtractTouchedDirective implements OnInit {
  @Input() control?: UntypedFormControl;
  @Input() children?: UntypedFormControl | UntypedFormControl[];

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    if (this.control) {
      extractTouchedChanges(this.control)
        .pipe(
          tap(() => {
            this.changeDetectorRef.markForCheck();
            if (this.children) {
              if (Array.isArray(this.children)) {
                this.children.forEach((control) => control.markAsTouched());
              } else {
                this.children.markAsTouched();
              }
            }
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe();
    } else {
      console.warn('Control is not found on extract touched');
    }
  }
}
