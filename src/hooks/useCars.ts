import { useState, useEffect, useCallback } from 'react';
import { Car, UserProfile } from '../types';
import { carService } from '../services/car.service';

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(() => {
    setLoading(true);
    try {
      const data = carService.getCars();
      setCars(data);
    } catch (err) {
      setError('Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const publishCar = async (user: UserProfile, vehicle: Omit<Car, 'id' | 'status' | 'ownerId' | 'ownerName' | 'postedBy'>) => {
    try {
      const newCar = await carService.publishCar(user, vehicle);
      setCars(prev => [...prev, newCar]);
      return newCar;
    } catch (err) {
      setError(String(err));
      throw err;
    }
  };

  const getAvailableCars = () => cars.filter(car => car.status === 'available');
  const getPublishedCars = (userId: string) => cars.filter(car => car.ownerId === userId);

  return {
    cars,
    loading,
    error,
    publishCar,
    getAvailableCars,
    getPublishedCars,
    refreshCars: fetchCars
  };
}
