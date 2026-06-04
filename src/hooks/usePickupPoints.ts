import { useState, useEffect, useCallback } from 'react';
import { PickupPoint } from '../types';
import { pickupService } from '../services/pickup.service';

export function usePickupPoints() {
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPickups = useCallback(() => {
    setLoading(true);
    const data = pickupService.getPickupPoints();
    setPickupPoints(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPickups();
  }, [fetchPickups]);

  const addPickupPoint = async (email: string, name: string, address: string) => {
    const newPoint = await pickupService.addPickupPoint(email, name, address);
    setPickupPoints(prev => [...prev, newPoint]);
    return newPoint;
  };

  return {
    pickupPoints,
    loading,
    addPickupPoint,
    refreshPickups: fetchPickups
  };
}
