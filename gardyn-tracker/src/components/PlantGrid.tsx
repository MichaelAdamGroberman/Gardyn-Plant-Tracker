'use client';

import { Plant, GardynSystem } from '@/types/plant';

interface PlantGridProps {
  system: GardynSystem;
  onSelectPlant: (plant: Plant) => void;
  onRemovePlant: (plantId: string) => void;
}

export default function PlantGrid({ system, onSelectPlant, onRemovePlant }: PlantGridProps) {
  const getPlantForSlot = (slot: number) => {
    return system.plants.find(p => p.slot === slot);
  };

  const getSlotColor = (plant: Plant | undefined) => {
    if (!plant) return 'bg-gray-100 hover:bg-gray-200';
    
    switch (plant.status) {
      case 'seedling':
        return 'bg-green-100 hover:bg-green-200';
      case 'growing':
        return 'bg-green-300 hover:bg-green-400';
      case 'mature':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'harvesting':
        return 'bg-yellow-400 hover:bg-yellow-500';
      case 'harvested':
        return 'bg-gray-300 hover:bg-gray-400';
      case 'removed':
        return 'bg-red-200 hover:bg-red-300';
      default:
        return 'bg-gray-200 hover:bg-gray-300';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'excellent':
        return '🌟';
      case 'good':
        return '✅';
      case 'fair':
        return '⚠️';
      case 'poor':
        return '❌';
      default:
        return '';
    }
  };

  return (
    <div className="grid grid-cols-5 md:grid-cols-6 gap-2">
      {Array.from({ length: system.slots }, (_, i) => i + 1).map(slot => {
        const plant = getPlantForSlot(slot);
        return (
          <div
            key={slot}
            className={`relative aspect-square rounded-lg p-2 cursor-pointer transition-colors ${getSlotColor(plant)}`}
            onClick={() => plant && onSelectPlant(plant)}
          >
            <div className="text-xs font-semibold absolute top-1 left-1">
              #{slot}
            </div>
            
            {plant ? (
              <>
                <div className="mt-4 text-center">
                  <p className="text-xs font-medium truncate">{plant.name}</p>
                  <p className="text-xs opacity-75 truncate">{plant.variety}</p>
                  {plant.healthStatus && (
                    <p className="text-lg mt-1">{getHealthIcon(plant.healthStatus)}</p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemovePlant(plant.id);
                  }}
                  className="absolute bottom-1 right-1 text-xs bg-red-500 text-white rounded px-1 hover:bg-red-600"
                >
                  ×
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <span className="text-2xl">+</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}