import { PickupPoint } from '../types';
import { storageService } from './storage.service';

const PICKUPS_KEY = 'drivepoint_pickups';

const defaultPickupPoints: PickupPoint[] = [
  {
    id: 'pickup-001',
    name: 'Terminal Norte',
    address: 'Av. Principal 540',
    status: 'active',
    createdBy: 'dealer@drivepoint.test'
  },
  {
    id: 'pickup-002',
    name: 'Parque Central',
    address: 'Calle 12 #34-56',
    status: 'active',
    createdBy: 'dealer@drivepoint.test'
  }
];

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export const pickupService = {
  getPickupPoints: (): PickupPoint[] => {
    const points = storageService.get<PickupPoint[]>(PICKUPS_KEY);
    if (!points) {
      storageService.set(PICKUPS_KEY, defaultPickupPoints);
      return defaultPickupPoints;
    }
    return points;
  },

  addPickupPoint: async (email: string, name: string, address: string): Promise<PickupPoint> => {
    const points = pickupService.getPickupPoints();
    const newPoint: PickupPoint = {
      id: generateId(),
      name,
      address,
      status: 'active',
      createdBy: email
    };
    const updated = [...points, newPoint];
    storageService.set(PICKUPS_KEY, updated);
    return newPoint;
  }
};
