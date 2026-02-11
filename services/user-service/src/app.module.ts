import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { PrismaModule } from './prisma/prisma.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [PrismaModule, AuthModule, CompanyModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
