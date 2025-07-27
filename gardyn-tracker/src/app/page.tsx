'use client';

import { useState } from 'react';
import PlantGrid from '@/components/PlantGrid';
import PlantForm from '@/components/PlantForm';
import SystemStatus from '@/components/SystemStatus';
import { Plant, GardynSystem } from '@/types/plant';

export default function Home() {
  const [system, setSystem] = useState<GardynSystem>({
    id: '1',
    name: 'My Gardyn',
    model: 'Gardyn 3.0',
    slots: 30,
    plants: [],
    waterLevel: 'full',
    nutrientLevel: 'adequate',
    lightHours: 16,
    lastMaintenance: new Date(),
  });

  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddPlant = (plant: Omit<Plant, 'id'>) => {
    const newPlant: Plant = {
      ...plant,
      id: Date.now().toString(),
    };
    setSystem({
      ...system,
      plants: [...system.plants, newPlant],
    });
    setShowForm(false);
  };

  const handleUpdatePlant = (updatedPlant: Plant) => {
    setSystem({
      ...system,
      plants: system.plants.map(p => 
        p.id === updatedPlant.id ? updatedPlant : p
      ),
    });
    setSelectedPlant(null);
  };

  const handleRemovePlant = (plantId: string) => {
    setSystem({
      ...system,
      plants: system.plants.filter(p => p.id !== plantId),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Gardyn Plant Tracker
        </h1>
        <p className="text-gray-600">
          Monitor and manage your hydroponic garden
        </p>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        <SystemStatus system={system} onUpdate={setSystem} />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Plant Grid ({system.plants.length}/{system.slots} slots)
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Add Plant
            </button>
          </div>

          <PlantGrid
            system={system}
            onSelectPlant={setSelectedPlant}
            onRemovePlant={handleRemovePlant}
          />
        </div>

        {showForm && (
          <PlantForm
            availableSlots={Array.from({ length: system.slots }, (_, i) => i + 1)
              .filter(slot => !system.plants.some(p => p.slot === slot))}
            onSubmit={handleAddPlant}
            onCancel={() => setShowForm(false)}
          />
        )}

        {selectedPlant && (
          <PlantForm
            plant={selectedPlant}
            availableSlots={[selectedPlant.slot]}
            onSubmit={(plant) => handleUpdatePlant({ ...plant, id: selectedPlant.id } as Plant)}
            onCancel={() => setSelectedPlant(null)}
          />
        )}
      </main>
    </div>
  );
}