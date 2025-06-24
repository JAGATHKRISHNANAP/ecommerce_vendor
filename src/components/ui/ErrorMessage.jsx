import React from 'react'
import { AlertCircle, X } from 'lucide-react'

const ErrorMessage = ({ 
  message, 
  onDismiss = null,
  className = '',
  variant = 'default' // 'default', 'inline', 'banner'
}) => {
  if (!message) return null

  const baseClasses = 'flex items-start space-x-2 text-red-600'
  
  const variantClasses = {
    default: 'p-3 bg-red-50 border border-red-200 rounded-lg',
    inline: 'p-2',
    banner: 'p-4 bg-red-50 border-l-4 border-red-400'
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">
          {typeof message === 'string' ? message : 'An error occurred'}
        </p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default ErrorMessage