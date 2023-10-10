// src/person/person.service.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './person.dto';

@Injectable()
export class PersonService {
  private people: any[] = [];

  create(createPersonDto: CreatePersonDto) {
    if (
      this.people.filter((person) => person.name.includes(createPersonDto.name))
        .length > 0
    ) {
      throw new HttpException(
        'A person with the same name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const id = (this.people.length + 1).toString();
    const person = { id, ...createPersonDto };
    this.people.push(person);
    return { id };
  }

  findAll() {
    return this.people;
  }

  findOne(id: string) {
    const person = this.people.find((p) => p.id === id);
    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    return person;
  }
}
