import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Put,
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
  @Get()
  findMyCompany(@Request() req: any) {
    return this.companyService.findUserCompany(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateMyCompany(@Request() req: any, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.updateUserCompany(req.user.userId, updateCompanyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateMyCompanyPut(@Request() req: any, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.updateUserCompany(req.user.userId, updateCompanyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, req.user.userId, updateCompanyDto);
  }
}
