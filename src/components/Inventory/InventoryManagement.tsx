import React, { useState } from 'react';
import { Package, Search, AlertTriangle, Plus, Eye, Edit, Calendar, Phone } from 'lucide-react';
import { mockInventory } from '../../data/mockData';
import { InventoryItem } from '../../types';
import { format } from 'date-fns';

export const InventoryManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [inventory] = useState(mockInventory);

  const categories = ['All', 'Medicine', 'Equipment', 'Supplies'];
  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (item: InventoryItem) => {
    const ratio = item.currentStock / item.minStock;
    if (ratio <= 1) return { status: 'critical', color: 'text-red-600', bg: 'bg-red-100' };
    if (ratio <= 1.5) return { status: 'low', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Inventory Management</h2>
        <p className="text-gray-600">Track medicines, equipment, and supplies</p>
      </div>

      {/* Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-md font-medium text-red-800">Low Stock Alert</h3>
          </div>
          <p className="text-sm text-red-600 mt-1">
            {lowStockItems.length} items are running low on stock and need immediate attention.
          </p>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {filteredInventory.map((item) => {
              const stockStatus = getStockStatus(item);
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer ${
                    selectedItem?.id === item.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {item.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.bg} ${stockStatus.color}`}>
                          {stockStatus.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${stockStatus.color}`}>
                        {item.currentStock}
                      </p>
                      <p className="text-sm text-gray-500">{item.unit}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Min Stock:</strong> {item.minStock} {item.unit}</p>
                      <p><strong>Supplier:</strong> {item.supplier.name}</p>
                    </div>
                    <div>
                      <p><strong>Last Restocked:</strong> {format(new Date(item.lastRestocked), 'MMM dd, yyyy')}</p>
                      {item.expiryDate && (
                        <p><strong>Expiry:</strong> {format(new Date(item.expiryDate), 'MMM dd, yyyy')}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      <Package className="h-4 w-4 mr-2" />
                      Restock
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Item Details */}
        <div>
          {selectedItem ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Item Details</h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900">{selectedItem.name}</h4>
                  <p className="text-sm text-gray-600">{selectedItem.category}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Current Stock</span>
                    <span className="text-lg font-bold text-gray-900">
                      {selectedItem.currentStock} {selectedItem.unit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Minimum Stock</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedItem.minStock} {selectedItem.unit}
                    </span>
                  </div>
                  {selectedItem.expiryDate && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">Expiry Date</span>
                      <span className="text-sm font-medium text-gray-900">
                        {format(new Date(selectedItem.expiryDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h5 className="text-md font-medium text-gray-700 mb-3">Supplier Information</h5>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-900">{selectedItem.supplier.name}</p>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">{selectedItem.supplier.contact}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="text-md font-medium text-gray-700 mb-3">Stock History</h5>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">
                      Last restocked: {format(new Date(selectedItem.lastRestocked), 'MMMM dd, yyyy')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    <Package className="h-4 w-4 mr-2" />
                    Update Stock
                  </button>
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full History
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select an item to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};