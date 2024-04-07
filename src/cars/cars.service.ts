import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  public readonly cars: Car[] = [];

  create(createCarDto: CreateCarDto) {
    const newCar = {
      id: this.cars.length + 1,
      ...createCarDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.cars.push(newCar);
    return newCar;
  }

  findAll() {
    return this.cars;
  }

  findOne(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car #${id} not found`);
    }
    return car;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    const car = this.findOne(id);
    car.brand = updateCarDto.brand;
    car.model = updateCarDto.model;
    car.year = updateCarDto.year;
    car.price = updateCarDto.price;
    car.isNew = updateCarDto.isNew;
    car.updatedAt = new Date();
    return car;
  }

  remove(id: number) {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex === -1) {
      throw new NotFoundException(`Car #${id} not found`);
    }
    this.cars.splice(carIndex, 1);
    return true;
  }
}
