import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'flashcards-container[mobile-no-gutter]',
  standalone: true,
})
export class MobileNoGutterDirective {
  @Input('mobile-no-gutter') mobileNoGutter: boolean | string | undefined | null;

  @HostBinding('class.flashcards-mobile-no-gutter') get isMobileNoGutter(): boolean {
    return coerceBooleanProperty(this.mobileNoGutter);
  }
}
