import { Inject, Injectable, Optional } from '@angular/core';

import { StorageSync, SYNC_STORAGE_KEY, SYNC_STORAGE_KEY_DEFAULT } from '../storage';
import { SessionStorageNative } from './session-storage-native';

/**
 * SessionStorageSync is proxy service for sessionStorage
 * @publicApi
 *
 * @usageNotes
 * ### Example
 * Simple use:
 *
 * ```
 * import { Component } from '@angular/core';
 *
 * import { sessionStorageSync } from '@fafn/core';
 *
 * @Component({})
 * export class YourComponent {
 *   constructor(private readonly sessionStorageSync: SessionStorageSync) {
 *     const name = this.sessionStorageSync.getItem('name');
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class SessionStorageSync<S extends Record<string, unknown> = Record<string, unknown>> extends StorageSync<S> {
  constructor(storage: SessionStorageNative, @Optional() @Inject(SYNC_STORAGE_KEY) key: string | null) {
    super(storage, key ?? SYNC_STORAGE_KEY_DEFAULT);
  }
}
