'use client';

import { GardynSystem } from '@/types/plant';

interface SystemStatusProps {
  system: GardynSystem;
  onUpdate: (system: GardynSystem) => void;
}

export default function SystemStatus({ system, onUpdate }: SystemStatusProps) {
  const getStatusColor = (level: string) => {
    switch (level) {
      case 'full':
      case 'excellent':
        return 'text-green-600';
      case 'adequate':
      case 'good':
        return 'text-yellow-600';
      case 'low':
      case 'fair':
        return 'text-orange-600';
      case 'empty':
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const updateLevel = (type: 'waterLevel' | 'nutrientLevel', value: any) => {
    onUpdate({ ...system, [type]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">System Status</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-2">Water Level</h3>
          <select
            value={system.waterLevel}
            onChange={(e) => updateLevel('waterLevel', e.target.value)}
            className={`w-full p-2 border rounded ${getStatusColor(system.waterLevel)}`}
          >
            <option value="full">Full</option>
            <option value="adequate">Adequate</option>
            <option value="low">Low</option>
            <option value="empty">Empty</option>
          </select>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-2">Nutrient Level</h3>
          <select
            value={system.nutrientLevel}
            onChange={(e) => updateLevel('nutrientLevel', e.target.value)}
            className={`w-full p-2 border rounded ${getStatusColor(system.nutrientLevel)}`}
          >
            <option value="full">Full</option>
            <option value="adequate">Adequate</option>
            <option value="low">Low</option>
            <option value="empty">Empty</option>
          </select>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-2">Light Hours</h3>
          <input
            type="number"
            value={system.lightHours}
            onChange={(e) => onUpdate({ ...system, lightHours: parseInt(e.target.value) || 0 })}
            className="w-full p-2 border rounded"
            min="0"
            max="24"
          />
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-2">Last Maintenance</h3>
          <p className="text-sm text-gray-600">
            {new Date(system.lastMaintenance).toLocaleDateString()}
          </p>
          <button
            onClick={() => onUpdate({ ...system, lastMaintenance: new Date() })}
            className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}