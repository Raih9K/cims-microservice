import {
    Body,
    Controller,
    Get,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';

@Controller('audit-logs')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post()
  create(@Body() createAuditLogDto: CreateAuditLogDto) {
    return this.auditService.create(createAuditLogDto);
  }

  @Get()
  findAll(
    @Query('companyId', ParseIntPipe) companyId: number,
    @Query('entityType') entityType?: string,
    @Query('entityId') entityId?: string,
  ) {
    return this.auditService.findAll(companyId, entityType, entityId);
  }
}
