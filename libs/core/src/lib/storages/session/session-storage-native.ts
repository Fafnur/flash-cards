import { Injectable } from '@angular/core';

import { MemoryStorage } from '../memory/memory.storage';
import { getStorage, StorageNative } from '../storage';

/**
 * SessionStorageNative is proxy service for sessionStorage
 * @publicApi
 *
 * ### Example
 * Simple use:
 *
 * ```
 * import { Component } from '@angular/core';
 *
 * import { LocalStorageSync } from '@fafn/core';
 *
 * @Component({})
 * export class YourComponent {
 *   constructor(private readonly sessionStorageNative: SessionStorageNative) {
 *     const name = this.sessionStorageNative.getItem('name');
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class SessionStorageNative extends StorageNative {
  constructor() {
    super(getStorage('sessionStorage') ?? new MemoryStorage());
  }
}
