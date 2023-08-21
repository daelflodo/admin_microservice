import { Controller, Get, UseGuards } from '@nestjs/common';
import { GatewayService } from './gateway.service';
// import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@ApiTags('gateway')
@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  getUsers(): string {
    return this.gatewayService.getUsers();
  }
}
