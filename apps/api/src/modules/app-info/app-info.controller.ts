import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppInfoService } from './app-info.service';

@ApiTags('App Info')
@Controller('app-info')
export class AppInfoController {
  constructor(private readonly appInfoService: AppInfoService) {}

  @Get()
  find() {
    return this.appInfoService.getAppInfo();
  }
}
