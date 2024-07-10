import { IsString, IsNumber, IsNotEmpty, IsDate, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  cognomeNomeRichiedente: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dataInserimentoRichiesta: Date;

  @IsNumber()
  @IsNotEmpty()
  importo: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(6)
  @Max(60)
  numeroRate: number;
}

export class UpdateRequestDto {
  @IsString()
  @IsNotEmpty()
  cognomeNomeRichiedente: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dataInserimentoRichiesta: Date;

  @IsNumber()
  @IsNotEmpty()
  importo: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(6)
  @Max(60)
  numeroRate: number;
}

export class QueryDateRangeDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dataMin: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dataMax: Date;

  @IsNumber()
  @IsNotEmpty()
  limit: number;
}
