/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { beforeBootstrap, config } from './app/app.config.browser';

beforeBootstrap();

bootstrapApplication(AppComponent, config).catch((err) => console.error(err));
