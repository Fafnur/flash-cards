import { Inject, Injectable, Optional } from '@angular/core';

import { ASYNC_STORAGE_KEY, ASYNC_STORAGE_KEY_DEFAULT, StorageAsync } from '../storage';
import { SessionStorageNative } from './session-storage-native';

/**
 * SessionStorageAsync is async storage for sessionStorage.
 * @publicApi
 *
 * @usageNotes
 * ### Example
 * Simple use:
 *
 * ```
 * import { Component } from '@angular/core';
 *
 * import { SessionStorageAsync } from '@fafn/core';
 *
 * @Component({})
 * export class YourComponent {
 *   constructor(private readonly sessionStorageAsync: SessionStorageAsync<{ id: number; name: string }>) {
 *     this.sessionStorageAsync.getItem('name').subscribe((name) => console.log(name);
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class SessionStorageAsync<S extends Record<string, unknown> = Record<string, unknown>> extends StorageAsync<S> {
  constructor(storage: SessionStorageNative, @Optional() @Inject(ASYNC_STORAGE_KEY) key: string | null) {
    super(storage, key ?? ASYNC_STORAGE_KEY_DEFAULT);
  }
}
