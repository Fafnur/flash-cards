import { Injectable } from '@angular/core';

import { MemoryStorage } from '../memory/memory.storage';
import { getStorage, StorageNative } from '../storage';

/**
 * LocalStorageSync is proxy service for localStorage
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
 *   constructor(private readonly localSyncStorage: LocalStorageSync) {
 *     const name = this.localSyncStorage.getItem('name');
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageNative extends StorageNative {
  constructor() {
    super(getStorage('localStorage') ?? new MemoryStorage());
  }
}
