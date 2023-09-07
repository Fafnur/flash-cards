import { Inject, Injectable, Optional } from '@angular/core';

import { ASYNC_STORAGE_KEY, ASYNC_STORAGE_KEY_DEFAULT, StorageAsync } from '../storage';
import { LocalStorageNative } from './local-storage-native';

/**
 * LocalStorageAsync is async storage for sessionStorage.
 * @publicApi
 *
 * @usageNotes
 * ### Example
 * Simple use:
 *
 * ```
 * import { Component } from '@angular/core';
 *
 * import { LocalStorageAsync } from '@fafn/core';
 *
 * @Component({})
 * export class YourComponent {
 *   constructor(private readonly localAsyncStorage: LocalStorageAsync<{ id: number; name: string }>) {
 *     this.localAsyncStorage.getItem('name').subscribe((name) => console.log(name);
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageAsync<S extends Record<string, unknown> = Record<string, unknown>> extends StorageAsync<S> {
  constructor(storage: LocalStorageNative, @Optional() @Inject(ASYNC_STORAGE_KEY) key: string | null) {
    super(storage, key ?? ASYNC_STORAGE_KEY_DEFAULT);
  }
}
