import { ElementRef, Renderer2 } from '@angular/core';

import { ColumnComponent } from './column.component';

/**
 * Directive for adding/removing size classes
 */
export abstract class ColumnDirective {
  /**
   * @private Column size
   */
  private size: number | undefined;

  /**
   * @private Column offset size
   */
  private offset: number | undefined;

  protected constructor(
    protected readonly renderer: Renderer2,
    protected readonly elementRef: ElementRef<ColumnComponent>,
    protected readonly className: string,
  ) {}

  /**
   * @param size New column size
   */
  updateSize(size: string | number | undefined | null) {
    if (this.size) {
      this.renderer.removeClass(this.elementRef.nativeElement, `flashcards-${this.className}-${this.size}`);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, `flashcards-${this.className}`);
    }

    const value = Number(size);
    if (Number.isInteger(value) && value > 0) {
      this.size = value;
      this.renderer.addClass(this.elementRef.nativeElement, `flashcards-${this.className}-${this.size}`);
    } else {
      this.size = undefined;
      this.renderer.addClass(this.elementRef.nativeElement, `flashcards-${this.className}`);
    }
  }

  /**
   * @param offset New column offset size
   */
  updateOffset(offset: string | number | undefined | null) {
    if (this.offset) {
      this.renderer.removeClass(this.elementRef.nativeElement, `flashcards-${this.className}-offset-${this.offset}`);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, `flashcards-${this.className}-offset`);
    }

    const value = Number(offset);
    if (Number.isInteger(value) && value > 0) {
      this.offset = value;
      this.renderer.addClass(this.elementRef.nativeElement, `flashcards-${this.className}-offset-${this.offset}`);
    } else {
      this.offset = undefined;
      this.renderer.addClass(this.elementRef.nativeElement, `flashcards-${this.className}-offset`);
    }
  }
}
