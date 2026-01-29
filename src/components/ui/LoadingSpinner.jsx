// // // import React from 'react'

// // // const LoadingSpinner = ({ 
// // //   size = 'medium', 
// // //   color = 'blue', 
// // //   className = '',
// // //   text = null 
// // // }) => {
// // //   const sizeClasses = {
// // //     small: 'w-4 h-4',
// // //     medium: 'w-6 h-6',
// // //     large: 'w-8 h-8',
// // //     xl: 'w-12 h-12'
// // //   }

// // //   const colorClasses = {
// // //     white: 'border-white border-t-transparent',
// // //     blue: 'border-blue-600 border-t-transparent',
// // //     gray: 'border-gray-600 border-t-transparent',
// // //     green: 'border-green-600 border-t-transparent',
// // //     red: 'border-red-600 border-t-transparent'
// // //   }

// // //   return (
// // //     <div className={`flex items-center justify-center ${className}`}>
// // //       <div
// // //         className={`
// // //           ${sizeClasses[size]} 
// // //           ${colorClasses[color]}
// // //           border-2 
// // //           rounded-full 
// // //           animate-spin
// // //         `}
// // //       />
// // //       {text && (
// // //         <span className="ml-2 text-sm text-gray-600">{text}</span>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // // export default LoadingSpinner





// // // src/components/ui/LoadingSpinner.jsx
// // import React from 'react';

// // const LoadingSpinner = ({ size = 'medium', color = '#007bff' }) => {
// //   const sizeMap = {
// //     small: '24px',
// //     medium: '40px',
// //     large: '60px'
// //   };

// //   const spinnerSize = sizeMap[size] || sizeMap.medium;

// //   return (
// //     <div style={{
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       padding: '20px'
// //     }}>
// //       <div
// //         style={{
// //           width: spinnerSize,
// //           height: spinnerSize,
// //           border: `4px solid #e3e3e3`,
// //           borderTop: `4px solid ${color}`,
// //           borderRadius: '50%',
// //           animation: 'spin 1s linear infinite'
// //         }}
// //       />
// //       <style jsx>{`
// //         @keyframes spin {
// //           0% { transform: rotate(0deg); }
// //           100% { transform: rotate(360deg); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default LoadingSpinner;
// // src/components/ui/LoadingSpinner.jsx
// import React from 'react';

// const LoadingSpinner = ({ size = 'small', color = 'currentColor' }) => {
//   const sizeMap = {
//     small: '18px',
//     medium: '32px',
//     large: '48px'
//   };

//   const spinnerSize = sizeMap[size] || size;

//   return (
//     <div style={{
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     }}>
//       <div
//         className="custom-spinner"
//         style={{
//           width: spinnerSize,
//           height: spinnerSize,
//           border: `2px solid transparent`,
//           borderTop: `2px solid ${color}`,
//           borderRight: `2px solid ${color}`,
//           borderRadius: '50%',
//         }}
//       />
//       <style jsx>{`
//         .custom-spinner {
//           animation: spin 0.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoadingSpinner;
// src/components/ui/LoadingSpinner.jsx
import React from 'react'

const LoadingSpinner = ({ size = 'medium', color = '#4f46e5' }) => {
  const sizeMap = {
    small: '18px',
    medium: '26px',
    large: '40px'
  }

  const spinnerSize = sizeMap[size] || sizeMap.medium

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: '3px solid rgba(0, 0, 0, 0.08)',
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}
      />
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner
