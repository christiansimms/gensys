import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

const sample1 = `Log Source Host\tLog Source Type\tLog Source\tLog Message
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.1564', 'level': 'INFO', 'logger': 'Ocelot.Authorisation.Middleware.AuthorisationMiddleware', 'message': 'requestId: 800001b8-0000-e400-b63f-84710c7967bb, previousRequestId: no previous request id, message: user scopes is authorised calling next authorisation checks' }
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.1564', 'level': 'INFO', 'logger': 'Ocelot.Authentication.Middleware.AuthenticationMiddleware', 'message': 'requestId: 800001b8-0000-e400-b63f-84710c7967bb, previousRequestId: no previous request id, message: \\/customers\\/84226\\/apps\\/current is an authenticated route. AuthenticationMiddleware checking if client is authenticated' }
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.1564', 'level': 'INFO', 'logger': 'Ocelot.Authorisation.Middleware.AuthorisationMiddleware', 'message': 'requestId: 800001b8-0000-e400-b63f-84710c7967bb, previousRequestId: no previous request id, message: \\/ezapi\\/PersonalApp\\/v1\\/customers\\/{id} route does not require user to be authorised' }
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.1564', 'level': 'INFO', 'logger': 'Ocelot.Authorisation.Middleware.AuthorisationMiddleware', 'message': 'requestId: 800001b8-0000-e400-b63f-84710c7967bb, previousRequestId: no previous request id, message: route is authenticated scopes must be checked' }
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.1552', 'level': 'INFO', 'logger': 'Microsoft.AspNetCore.Hosting.Diagnostics', 'message': 'Request starting HTTP\\/1.1 GET http:\\/\\/stgplgtwy.example.com\\/customers\\/84226\\/apps\\/current  ' }
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.0995', 'level': 'INFO', 'logger': 'Microsoft.AspNetCore.Hosting.Diagnostics', 'message': 'Request finished in 1158.0783ms 200 application\\/json; charset=UTF-8' }
`;

const sample2 = `URL\tResponse Code\tLog Date\tLog Source Host\tLog Message
/api/v1/Documents\t0\t3/19/2021 23:47\tDC2-PRDPLWEB02\t2021-03-19 23:44:57 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4_1+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.3+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Declined 0 0 64 14509 -
/api/v1/Documents\t0\t3/19/2021 23:32\tDC2-PRDPLWEB02\t2021-03-19 23:31:24 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(Linux;+Android+9;+U307AS)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/79.0.3945.116+Mobile+Safari/537.36 https://personalloans.example.com/Declined 0 0 64 141074 -
/api/v1/Documents\t0\t3/19/2021 23:13\tDC2-PRDPLWEB02\t2021-03-19 23:12:33 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.3+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Application 0 0 64 130897 -
/api/v1/Documents\t0\t3/19/2021 20:34\tDC2-PRDPLWEB02\t2021-03-19 20:34:18 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_0_1+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Documents/Additional-Documents 0 0 64 127827 -
/api/v1/Documents\t0\t3/19/2021 20:30\tDC2-PRDPLWEB02\t2021-03-19 20:28:29 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_0_1+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Documents/Additional-Documents 0 0 64 122239 -
/api/v1/Documents\t0\t3/19/2021 19:36\tDC2-PRDPLWEB02\t2021-03-19 19:34:38 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4_1+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.3+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Application 0 0 64 35707 -
/api/v1/Documents\t500\t3/19/2021 18:17\tDC2-PRDPLWEB01\t2021-03-19 18:17:26 10.20.30.192 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(Windows+NT+10.0;+Win64;+x64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/89.0.4389.90+Safari/537.36 https://personalloans.example.com/ 500 0 0 445 -
/api/v1/Documents\t0\t3/19/2021 16:28\tDC2-PRDPLWEB01\t2021-03-19 16:28:57 10.20.30.192 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4_1+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Mobile/15E148+[FBAN/FBIOS;FBDV/iPhone11,2;FBMD/iPhone;FBSN/iOS;FBSV/14.4.1;FBSS/3;FBID/phone;FBLC/en_US;FBOP/5] https://personalloans.example.com/Application 0 0 64 37391 -
/api/v1/Documents\t0\t3/19/2021 16:23\tDC2-PRDPLWEB02\t2021-03-19 16:21:44 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.3+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Documents/Bank-Account/ACH-Agreement 0 0 64 79837 -
/api/v1/Documents\t0\t3/19/2021 15:57\tDC2-PRDPLWEB01\t2021-03-19 15:57:58 10.20.30.192 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4_1+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.3+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Declined 0 0 64 6741 -
/api/v1/Documents\t0\t3/19/2021 15:37\tDC2-PRDPLWEB02\t2021-03-19 15:35:05 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.3+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Documents/Bank-Account/ACH-Agreement 0 0 64 63290 -
/api/v1/Documents\t0\t3/19/2021 15:22\tDC2-PRDPLWEB01\t2021-03-19 15:22:37 10.20.30.192 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_3+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.2+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Application-Pending 0 0 64 6752 -
/api/v1/Documents\t0\t3/19/2021 15:20\tDC2-PRDPLWEB02\t2021-03-19 15:19:34 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.3+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Documents/Additional-Documents 0 0 64 189093 -
/api/v1/Documents\t0\t3/19/2021 14:30\tDC2-PRDPLWEB02\t2021-03-19 14:29:31 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4_1+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.3+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Declined 0 0 64 6152 -
/api/v1/Documents\t0\t3/19/2021 13:38\tDC2-PRDPLWEB01\t2021-03-19 13:38:27 10.20.30.192 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.3+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Declined 0 0 64 16844 -
/api/v1/Documents\t0\t3/19/2021 12:33\tDC2-PRDPLWEB02\t2021-03-19 12:31:59 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+CriOS/86.0.4240.93+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Documents/Additional-Documents 0 0 64 69068 -
/api/v1/Documents\t500\t3/19/2021 11:59\tDC2-PRDPLWEB02\t2021-03-19 11:57:19 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(Windows+NT+10.0;+Win64;+x64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/88.0.4324.182+Safari/537.36 https://personalloans.example.com/ 500 0 0 839 -
/api/v1/Documents\t0\t3/19/2021 4:05\tDC2-PRDPLWEB02\t2021-03-19 04:03:43 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_4+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.3+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Declined 0 0 64 3836 -
/api/v1/Documents\t0\t3/19/2021 1:11\tDC2-PRDPLWEB02\t2021-03-19 01:03:56 10.20.30.194 POST /api/v1/Documents - 80 - 10.20.51.39 Mozilla/5.0+(iPhone;+CPU+iPhone+OS+14_3+like+Mac+OS+X)+AppleWebKit/605.1.15+(KHTML,+like+Gecko)+Version/14.0.2+Mobile/15E148+Safari/604.1 https://personalloans.example.com/Declined 0 0 64 145348 -
`;

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  rawText: string;

  constructor() { }

  detectTable(text: string): string[][] {
    const rows = [];
    text.split('\n').forEach(rawLine => {
      const row = [];
      rows.push(row);
      rawLine.split('\t').forEach(col => {
        row.push(col);
      });
    });
    return rows;
  }

  readSpreadsheet(): void {
    navigator.clipboard.readText().then(text => {
      this.doWork(text);
    });
  }

  readSample1(): void {
    this.doWork(sample1);
  }

  readSample2(): void {
    this.doWork(sample2);
  }

  private doWork(text: string): void {
    // console.log('Read: ', text);
    this.rawText = text.trim();
  }

  getRawData(): Observable<string> {
    return of(this.rawText);
  }
}
