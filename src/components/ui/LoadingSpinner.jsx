// import React from 'react'

// const LoadingSpinner = ({ 
//   size = 'medium', 
//   color = 'blue', 
//   className = '',
//   text = null 
// }) => {
//   const sizeClasses = {
//     small: 'w-4 h-4',
//     medium: 'w-6 h-6',
//     large: 'w-8 h-8',
//     xl: 'w-12 h-12'
//   }

//   const colorClasses = {
//     white: 'border-white border-t-transparent',
//     blue: 'border-blue-600 border-t-transparent',
//     gray: 'border-gray-600 border-t-transparent',
//     green: 'border-green-600 border-t-transparent',
//     red: 'border-red-600 border-t-transparent'
//   }

//   return (
//     <div className={`flex items-center justify-center ${className}`}>
//       <div
//         className={`
//           ${sizeClasses[size]} 
//           ${colorClasses[color]}
//           border-2 
//           rounded-full 
//           animate-spin
//         `}
//       />
//       {text && (
//         <span className="ml-2 text-sm text-gray-600">{text}</span>
//       )}
//     </div>
//   )
// }

// export default LoadingSpinner





// src/components/ui/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = '#007bff' }) => {
  const sizeMap = {
    small: '24px',
    medium: '40px',
    large: '60px'
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: `4px solid #e3e3e3`,
          borderTop: `4px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
};

export default LoadingSpinner;