import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[size]',
  standalone: true,
})
export class SizeDirective {
  @Input() size: 'small' | 'medium' | 'large' | undefined | null = 'medium';

  @HostBinding('class.flashcards-size-small') get isSmall(): boolean {
    return this.size === 'small';
  }

  @HostBinding('class.flashcards-size-medium') get isMedium(): boolean {
    return !this.size || this.size === 'medium';
  }

  @HostBinding('class.flashcards-size-large') get isLarge(): boolean {
    return this.size === 'large';
  }
}
