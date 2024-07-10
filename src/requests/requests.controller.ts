import { Controller, Get, Post, Body, Param, Query, Delete, Put, NotFoundException } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto, UpdateRequestDto, QueryDateRangeDto } from './dtos';
import { Request } from './request.schema';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  async create(@Body() createRequestDto: CreateRequestDto): Promise<Request> {
    return this.requestsService.create(createRequestDto);
  }

  @Get()
  async findAll(@Query('limit') limit: number): Promise<Request[]> {
    return this.requestsService.findAll(limit);
  }

  @Get('search')
  async findByName(@Query('name') name: string): Promise<Request[]> {
    return this.requestsService.findByName(name);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto): Promise<Request> {
    return this.requestsService.update(id, updateRequestDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.requestsService.delete(id);
  }

  @Post('date-range')
  async findByDateRange(@Body() queryDateRangeDto: QueryDateRangeDto): Promise<Request[]> {
    return this.requestsService.findByDateRange(queryDateRangeDto);
  }

  @Post('sum-importi')
  async sumImportiByDateRange(@Body() queryDateRangeDto: QueryDateRangeDto): Promise<number> {
    return this.requestsService.sumImportiByDateRange(queryDateRangeDto);
  }

  @Post('avg-rate')
  async avgNumeroRateByDateRange(@Body() queryDateRangeDto: QueryDateRangeDto): Promise<number> {
    return this.requestsService.avgNumeroRateByDateRange(queryDateRangeDto);
  }
}
