import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, req.user.userId, updateCompanyDto);
  }
}
