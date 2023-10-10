import { IsString, IsInt, IsNotEmpty, Length } from 'class-validator';
export class CreatePersonDto {
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @Length(3, 255, { message: 'Name should have at least 3 character' })
  name: string;

  @IsInt()
  age: number;
}
