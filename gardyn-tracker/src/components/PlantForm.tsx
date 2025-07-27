'use client';

import { useState } from 'react';
import { Plant } from '@/types/plant';

interface PlantFormProps {
  plant?: Plant;
  availableSlots: number[];
  onSubmit: (plant: Omit<Plant, 'id'>) => void;
  onCancel: () => void;
}

export default function PlantForm({ plant, availableSlots, onSubmit, onCancel }: PlantFormProps) {
  const [formData, setFormData] = useState({
    name: plant?.name || '',
    variety: plant?.variety || '',
    slot: plant?.slot || availableSlots[0] || 1,
    plantedDate: plant?.plantedDate ? new Date(plant.plantedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    harvestDate: plant?.harvestDate ? new Date(plant.harvestDate).toISOString().split('T')[0] : '',
    status: plant?.status || 'seedling' as const,
    notes: plant?.notes || '',
    healthStatus: plant?.healthStatus || 'good' as const,
    growthRate: plant?.growthRate || 'normal' as const,
    yield: plant?.yield || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      ...formData,
      plantedDate: new Date(formData.plantedDate),
      harvestDate: formData.harvestDate ? new Date(formData.harvestDate) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {plant ? 'Edit Plant' : 'Add New Plant'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plant Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variety
            </label>
            <input
              type="text"
              value={formData.variety}
              onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slot Number
            </label>
            <select
              value={formData.slot}
              onChange={(e) => setFormData({ ...formData, slot: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-md"
              required
            >
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>
                  Slot {slot}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Planted Date
            </label>
            <input
              type="date"
              value={formData.plantedDate}
              onChange={(e) => setFormData({ ...formData, plantedDate: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Harvest Date
            </label>
            <input
              type="date"
              value={formData.harvestDate}
              onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Plant['status'] })}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="seedling">Seedling</option>
              <option value="growing">Growing</option>
              <option value="mature">Mature</option>
              <option value="harvesting">Harvesting</option>
              <option value="harvested">Harvested</option>
              <option value="removed">Removed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Health Status
            </label>
            <select
              value={formData.healthStatus}
              onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value as Plant['healthStatus'] })}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Growth Rate
            </label>
            <select
              value={formData.growthRate}
              onChange={(e) => setFormData({ ...formData, growthRate: e.target.value as Plant['growthRate'] })}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="fast">Fast</option>
              <option value="normal">Normal</option>
              <option value="slow">Slow</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yield (optional)
            </label>
            <input
              type="number"
              value={formData.yield}
              onChange={(e) => setFormData({ ...formData, yield: parseFloat(e.target.value) || 0 })}
              className="w-full p-2 border rounded-md"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              {plant ? 'Update' : 'Add'} Plant
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}