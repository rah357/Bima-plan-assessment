// src/person/person.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './person.dto';
import { validateOrReject } from 'class-validator';
import { ValidationPipe } from './validation.pipe';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createPersonDto: CreatePersonDto) {
    try {
      await validateOrReject(createPersonDto, { skipMissingProperties: true });
    } catch (errors) {
      throw new HttpException(
        { message: 'Validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = this.personService.create(createPersonDto);
    return response;
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: CreatePersonDto) {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }
}
