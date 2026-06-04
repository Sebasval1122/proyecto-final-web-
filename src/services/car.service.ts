import { Car, Role, UserProfile } from '../types';
import { storageService } from './storage.service';

const CARS_KEY = 'drivepoint_cars';

const defaultCars: Car[] = [
  {
    id: 'car-001',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: 18500,
    type: 'sale',
    status: 'available',
    ownerId: 'dealer-001',
    ownerName: 'Concesionaria Alfa',
    postedBy: 'dealer'
  },
  {
    id: 'car-002',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    price: 42000,
    type: 'sale',
    status: 'available',
    ownerId: 'dealer-001',
    ownerName: 'Concesionaria Alfa',
    postedBy: 'dealer'
  },
  {
    id: 'car-003',
    make: 'Hyundai',
    model: 'Kona',
    year: 2021,
    price: 49,
    type: 'rent',
    status: 'available',
    ownerId: 'dealer-001',
    ownerName: 'Concesionaria Alfa',
    postedBy: 'dealer'
  },
  {
    id: 'car-004',
    make: 'Ford',
    model: 'EcoSport',
    year: 2020,
    price: 22,
    type: 'rent',
    status: 'available',
    ownerId: 'user-001',
    ownerName: 'Cliente Demo',
    postedBy: 'user'
  }
];

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export const carService = {
  getCars: (): Car[] => {
    const cars = storageService.get<Car[]>(CARS_KEY);
    if (!cars) {
      storageService.set(CARS_KEY, defaultCars);
      return defaultCars;
    }
    return cars;
  },

  publishCar: async (user: UserProfile, vehicle: Omit<Car, 'id' | 'status' | 'ownerId' | 'ownerName' | 'postedBy'>): Promise<Car> => {
    const cars = carService.getCars();
    const newCar: Car = {
      ...vehicle,
      id: generateId(),
      status: 'available',
      ownerId: user.id,
      ownerName: user.name,
      postedBy: user.role
    };
    const updatedCars = [...cars, newCar];
    storageService.set(CARS_KEY, updatedCars);
    return newCar;
  },

  getAvailableCars: (): Car[] => {
    return carService.getCars().filter(car => car.status === 'available');
  },

  getPublishedCars: (userId: string): Car[] => {
    return carService.getCars().filter(car => car.ownerId === userId);
  }
};
