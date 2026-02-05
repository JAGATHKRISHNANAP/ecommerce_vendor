// AddProduct.jsx
import React, { useState } from 'react';
import Categories from './Categories';
import Subcategories from './Subcategories';
import Specifications from './Specifications';
import Products from './Products';

const AddProduct = () => {
  const [currentView, setCurrentView] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const resetNavigation = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    resetNavigation();
  };

  const renderView = () => {
    // If we have a selected subcategory, show specifications
    if (selectedSubcategory) {
      return (
        <Specifications
          subcategory={selectedSubcategory}
          onBack={() => setSelectedSubcategory(null)}
        />
      );
    }

    // If we have a selected category, show subcategories
    if (selectedCategory) {
      return (
        <Subcategories
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
          onSelectSubcategory={setSelectedSubcategory}
        />
      );
    }

    // Show the main views
    switch (currentView) {
      case 'categories':
        return <Categories onSelectCategory={setSelectedCategory} />;
      case 'products':
        return <Products />;
      default:
        return <Categories onSelectCategory={setSelectedCategory} />;
    }
  };

  const getPageTitle = () => {
    if (selectedSubcategory) {
      return `${selectedCategory.name} > ${selectedSubcategory.name} > Specifications`;
    }
    if (selectedCategory) {
      return `${selectedCategory.name} > Subcategories`;
    }
    return currentView === 'categories' ? 'Categories' : 'Products';
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '15px 20px',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Product Management System</h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
          {getPageTitle()}
        </p>
      </header>

      {/* Navigation */}
      {!selectedCategory && !selectedSubcategory && (
        <nav style={{
          padding: '0 20px',
          marginBottom: '20px',
          borderBottom: '1px solid #ddd',
          paddingBottom: '10px'
        }}>
          <button
            onClick={() => handleViewChange('categories')}
            style={{
              marginRight: '10px',
              padding: '8px 16px',
              border: 'none',
              backgroundColor: currentView === 'categories' ? '#007bff' : '#e9ecef',
              color: currentView === 'categories' ? 'white' : '#495057',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Categories
          </button>
          <button
            onClick={() => handleViewChange('products')}
            style={{
              padding: '8px 16px',
              border: 'none',
              backgroundColor: currentView === 'products' ? '#007bff' : '#e9ecef',
              color: currentView === 'products' ? 'white' : '#495057',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Products
          </button>
        </nav>
      )}

      {/* Main Content */}
      <main>
        {renderView()}
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: '40px',
        padding: '20px',
        textAlign: 'center',
        borderTop: '1px solid #ddd',
        color: '#6c757d',
        fontSize: '14px'
      }}>
        <p>Product Management System - Manage your categories, subcategories, specifications, and products</p>
      </footer>
    </div>
  );
};

export default AddProduct;

