import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
// import { CeaserCipherComponent } from './ceaser-cipher/ceaser-cipher.component';
// import { VigenereCipherComponent } from './vigenere-cipher/vigenere-cipher.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { LayOutComponent } from './lay-out/lay-out.component';
import { AlgosComponent } from './algos/algos.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { EncryptionComponent } from './encryption/encryption.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { DecryptionComponent } from './decryption/decryption.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    // CeaserCipherComponent,
    // VigenereCipherComponent,
    LayOutComponent,
    AlgosComponent,
    EncryptionComponent,
    DecryptionComponent
  ],
  imports: [
    BrowserModule,
    NzButtonModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzCardModule,
    NzDropDownModule,
    NzDividerModule,
    NgxSelectModule,
    NzToolTipModule,
    NzAvatarModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
