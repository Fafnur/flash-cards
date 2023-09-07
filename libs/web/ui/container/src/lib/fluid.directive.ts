import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'flashcards-container[fluid]',
  standalone: true,
})
export class FluidDirective {
  @Input() fluid: boolean | string | undefined | null;

  @HostBinding('class.flashcards-fluid') get isFluid(): boolean {
    return coerceBooleanProperty(this.fluid);
  }
}
