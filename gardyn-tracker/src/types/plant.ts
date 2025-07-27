export interface Plant {
  id: string;
  name: string;
  variety: string;
  slot: number;
  plantedDate: Date;
  harvestDate?: Date;
  status: 'seedling' | 'growing' | 'mature' | 'harvesting' | 'harvested' | 'removed';
  notes?: string;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  growthRate: 'fast' | 'normal' | 'slow';
  yield?: number;
  imageUrl?: string;
}

export interface PlantHistory {
  id: string;
  plantId: string;
  action: 'planted' | 'watered' | 'fertilized' | 'pruned' | 'harvested' | 'removed' | 'note';
  date: Date;
  notes?: string;
  quantity?: number;
}

export interface GardynSystem {
  id: string;
  name: string;
  model: string;
  slots: number;
  plants: Plant[];
  waterLevel: 'full' | 'adequate' | 'low' | 'empty';
  nutrientLevel: 'full' | 'adequate' | 'low' | 'empty';
  lightHours: number;
  lastMaintenance: Date;
}