import { Injectable } from '@nestjs/common';

@Injectable()
export class AppInfoService {
  getAppInfo() {
    return {
      name: 'Travel Intelligence Platform',
      environment: 'local',
      version: '0.1.0',
    };
  }
}
