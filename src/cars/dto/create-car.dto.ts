export class CreateCarDto {
  brand: string;
  model: string;
  year: number;
  price: number;
  isNew: boolean;
  createdAt: Date;
  updatedAt: Date;
}
