import { Inject, Injectable, Optional } from '@angular/core';

import { StorageSync, SYNC_STORAGE_KEY, SYNC_STORAGE_KEY_DEFAULT } from '../storage';
import { LocalStorageNative } from './local-storage-native';

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
export class LocalStorageSync<S extends Record<string, unknown> = Record<string, unknown>> extends StorageSync<S> {
  constructor(storage: LocalStorageNative, @Optional() @Inject(SYNC_STORAGE_KEY) key: string | null) {
    super(storage, key ?? SYNC_STORAGE_KEY_DEFAULT);
  }
}
