import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, RequestDocument } from './request.schema';
import { CreateRequestDto, UpdateRequestDto, QueryDateRangeDto } from './dtos';

@Injectable()
export class RequestsService {
  constructor(@InjectModel(Request.name) private requestModel: Model<RequestDocument>) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const createdRequest = new this.requestModel(createRequestDto);
    return createdRequest.save();
  }

  async findAll(limit: number): Promise<Request[]> {
    return this.requestModel.find().sort({ dataInserimentoRichiesta: -1 }).limit(limit).exec();
  }

  async findByName(name: string): Promise<Request[]> {
    return this.requestModel.find({ cognomeNomeRichiedente: new RegExp(name, 'i') }).sort({ dataInserimentoRichiesta: -1 }).exec();
  }

  async update(id: string, updateRequestDto: UpdateRequestDto): Promise<Request> {
    const existingRequest = await this.requestModel.findByIdAndUpdate(id, updateRequestDto, { new: true }).exec();
    if (!existingRequest) {
      throw new NotFoundException(`Request #${id} not found`);
    }
    return existingRequest;
  }

  async delete(id: string): Promise<any> {
    const result = await this.requestModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Request #${id} not found`);
    }
    return result;
  }

  async findByDateRange(queryDateRangeDto: QueryDateRangeDto): Promise<Request[]> {
    const { dataMin, dataMax, limit } = queryDateRangeDto;
    return this.requestModel.find({
      dataInserimentoRichiesta: { $gte: new Date(dataMin), $lte: new Date(dataMax) },
    }).sort({ dataInserimentoRichiesta: -1 }).limit(limit).exec();
  }

  async sumImportiByDateRange(queryDateRangeDto: QueryDateRangeDto): Promise<number> {
    const { dataMin, dataMax } = queryDateRangeDto;
    const result = await this.requestModel.aggregate([
      { $match: { dataInserimentoRichiesta: { $gte: new Date(dataMin), $lte: new Date(dataMax) } } },
      { $group: { _id: null, totalImporto: { $sum: '$importo' } } },
    ]);
    return result[0]?.totalImporto || 0;
  }

  async avgNumeroRateByDateRange(queryDateRangeDto: QueryDateRangeDto): Promise<number> {
    const { dataMin, dataMax } = queryDateRangeDto;
    const result = await this.requestModel.aggregate([
      { $match: { dataInserimentoRichiesta: { $gte: new Date(dataMin), $lte: new Date(dataMax) } } },
      { $group: { _id: null, avgNumeroRate: { $avg: '$numeroRate' } } },
    ]);
    return result[0]?.avgNumeroRate || 0;
  }
}
