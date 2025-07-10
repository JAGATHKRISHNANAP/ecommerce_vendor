import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight, Search, Filter, Eye } from 'lucide-react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
//   const [modalType, setModalType] = useState('category'); // 'category' or 'subcategory'

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    is_active: true
  });

  const [subcategoryForm, setSubcategoryForm] = useState({
    name: '',
    description: '',
    category_id: null
  });

  // API Base URL - adjust this to match your backend
  const API_BASE = 'http://localhost:8000/api/v1';

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch subcategories for a category
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`${API_BASE}/categories/${categoryId}/subcategories`);
      if (response.ok) {
        const data = await response.json();
        setSubcategories(prev => ({
          ...prev,
          [categoryId]: data
        }));
      }
    } catch (err) {
      console.error('Failed to fetch subcategories:', err);
    }
  };

  // Create category
  const createCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryForm)
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories(prev => [...prev, newCategory]);
        setCategoryForm({ name: '', description: '', is_active: true });
        setShowCreateModal(false);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to create category');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create subcategory
  const createSubcategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/categories/${subcategoryForm.category_id}/subcategories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: subcategoryForm.name,
          description: subcategoryForm.description
        })
      });

      if (response.ok) {
        const newSubcategory = await response.json();
        setSubcategories(prev => ({
          ...prev,
          [subcategoryForm.category_id]: [
            ...(prev[subcategoryForm.category_id] || []),
            newSubcategory
          ]
        }));
        setSubcategoryForm({ name: '', description: '', category_id: null });
        setShowSubcategoryModal(false);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to create subcategory');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
      if (!subcategories[categoryId]) {
        fetchSubcategories(categoryId);
      }
    }
    setExpandedCategories(newExpanded);
  };

  // Open create subcategory modal
  const openSubcategoryModal = (category) => {
    setSelectedCategory(category);
    setSubcategoryForm(prev => ({ ...prev, category_id: category.category_id }));
    setShowSubcategoryModal(true);
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
            <p className="text-gray-600 mt-1">Manage your product categories and subcategories</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Subcategories</p>
              <p className="text-2xl font-bold text-gray-900">
                {Object.values(subcategories).reduce((acc, subs) => acc + subs.length, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter(cat => cat.is_active).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Filter className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading && categories.length === 0 ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">No categories found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <div key={category.category_id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => toggleCategory(category.category_id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      {expandedCategories.has(category.category_id) ? (
                        <ChevronDown size={16} className="text-gray-600" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-600" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      {category.description && (
                        <p className="text-gray-600 mt-1">{category.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          category.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {category.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {subcategories[category.category_id]?.length || 0} subcategories
                        </span>
                        <span className="text-sm text-gray-500">
                          Created: {new Date(category.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openSubcategoryModal(category)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <Plus size={14} />
                      Add Sub
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Subcategories */}
                {expandedCategories.has(category.category_id) && (
                  <div className="mt-4 ml-8 space-y-2">
                    {subcategories[category.category_id]?.length > 0 ? (
                      subcategories[category.category_id].map((subcategory) => (
                        <div key={subcategory.subcategory_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{subcategory.name}</h4>
                            {subcategory.description && (
                              <p className="text-sm text-gray-600 mt-1">{subcategory.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                ID: {subcategory.subcategory_id}
                              </span>
                              {subcategory.is_active !== undefined && (
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  subcategory.is_active 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {subcategory.is_active ? 'Active' : 'Inactive'}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                              <Edit2 size={14} />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 text-sm italic">No subcategories yet</p>
                        <button
                          onClick={() => openSubcategoryModal(category)}
                          className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Add the first subcategory
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Category Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Create New Category</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter category name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter category description"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={categoryForm.is_active}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_active" className="text-sm text-gray-700">
                  Active category
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={createCategory}
                  disabled={loading || !categoryForm.name.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Subcategory Modal */}
      {showSubcategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Add Subcategory
              </h2>
              <button
                onClick={() => setShowSubcategoryModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {selectedCategory && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Parent Category:</span> {selectedCategory.name}
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory Name *
                </label>
                <input
                  type="text"
                  required
                  value={subcategoryForm.name}
                  onChange={(e) => setSubcategoryForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter subcategory name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={subcategoryForm.description}
                  onChange={(e) => setSubcategoryForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter subcategory description"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSubcategoryModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={createSubcategory}
                  disabled={loading || !subcategoryForm.name.trim()}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Subcategory'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;