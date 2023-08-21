import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateTasksDtos {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string = 'Pending';

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}

export class UpdateTasksDto extends PartialType(CreateTasksDtos) {
  @IsString()
  readonly status: string;
}
