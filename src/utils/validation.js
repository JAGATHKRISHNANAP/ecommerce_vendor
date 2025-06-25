//src/utils/validation.js
export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.trim() === '') {
    return { isValid: false, error: 'Phone number is required' }
  }

  // Remove all non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, '')

  if (cleanNumber.length < 10) {
    return { isValid: false, error: 'Phone number must be at least 10 digits' }
  }

  if (cleanNumber.length > 15) {
    return { isValid: false, error: 'Phone number is too long' }
  }

  // Basic format validation (you can make this more specific per country)
  const phoneRegex = /^[0-9]{10,15}$/
  if (!phoneRegex.test(cleanNumber)) {
    return { isValid: false, error: 'Invalid phone number format' }
  }

  return { isValid: true, error: null }
}



export const validateAadhar = (aadhar) => ({
  isValid: /^\d{12}$/.test(aadhar),
  error: 'Aadhar must be 12 digits'
});

export const validateIFSC = (ifsc) => ({
  isValid: /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.toUpperCase()),
  error: 'Invalid IFSC code'
});






// Email validation
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }

  if (email.length > 254) {
    return { isValid: false, error: 'Email address is too long' }
  }

  return { isValid: true, error: null }
}

// Password validation
export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required' }
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' }
  }

  if (password.length > 128) {
    return { isValid: false, error: 'Password is too long' }
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' }
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' }
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' }
  }

  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' }
  }

  return { isValid: true, error: null }
}

// OTP validation
export const validateOTP = (otp) => {
  if (!otp || otp.trim() === '') {
    return { isValid: false, error: 'OTP is required' }
  }

  // Remove any non-digit characters
  const cleanOTP = otp.replace(/\D/g, '')

  if (cleanOTP.length !== 6) {
    return { isValid: false, error: 'OTP must be 6 digits' }
  }

  return { isValid: true, error: null }
}

// Name validation
export const validateName = (name, fieldName = 'Name') => {
  if (!name || name.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` }
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters long` }
  }

  if (name.length > 50) {
    return { isValid: false, error: `${fieldName} is too long` }
  }

  // Only allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/
  if (!nameRegex.test(name)) {
    return { isValid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` }
  }

  return { isValid: true, error: null }
}

// Age validation
export const validateAge = (age) => {
  if (!age && age !== 0) {
    return { isValid: false, error: 'Age is required' }
  }

  const numAge = parseInt(age, 10)
  if (isNaN(numAge)) {
    return { isValid: false, error: 'Age must be a number' }
  }

  if (numAge < 13) {
    return { isValid: false, error: 'You must be at least 13 years old' }
  }

  if (numAge > 120) {
    return { isValid: false, error: 'Please enter a valid age' }
  }

  return { isValid: true, error: null }
}

// URL validation
export const validateURL = (url) => {
  if (!url || url.trim() === '') {
    return { isValid: false, error: 'URL is required' }
  }

  try {
    new URL(url)
    return { isValid: true, error: null }
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' }
  }
}

// File validation
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
    required = true
  } = options

  if (!file) {
    if (required) {
      return { isValid: false, error: 'File is required' }
    }
    return { isValid: true, error: null }
  }

  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024))
    return { isValid: false, error: `File size must be less than ${maxSizeMB}MB` }
  }

  if (!allowedTypes.includes(file.type)) {
    const typesList = allowedTypes.map(type => type.split('/')[1]).join(', ')
    return { isValid: false, error: `File must be of type: ${typesList}` }
  }

  return { isValid: true, error: null }
}

// Credit card validation (basic Luhn algorithm)
export const validateCreditCard = (cardNumber) => {
  if (!cardNumber || cardNumber.trim() === '') {
    return { isValid: false, error: 'Card number is required' }
  }

  // Remove spaces and hyphens
  const cleanNumber = cardNumber.replace(/[\s-]/g, '')

  // Check if it contains only digits
  if (!/^\d+$/.test(cleanNumber)) {
    return { isValid: false, error: 'Card number can only contain digits' }
  }

  // Check length (13-19 digits for most cards)
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return { isValid: false, error: 'Card number must be between 13-19 digits' }
  }

  // Luhn algorithm
  let sum = 0
  let isEven = false

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  if (sum % 10 !== 0) {
    return { isValid: false, error: 'Invalid card number' }
  }

  return { isValid: true, error: null }
}

// Date validation
export const validateDate = (date, options = {}) => {
  const { future = true, past = true, minAge = 0, maxAge = 150 } = options

  if (!date) {
    return { isValid: false, error: 'Date is required' }
  }

  const inputDate = new Date(date)
  const today = new Date()

  if (isNaN(inputDate.getTime())) {
    return { isValid: false, error: 'Please enter a valid date' }
  }

  if (!future && inputDate > today) {
    return { isValid: false, error: 'Date cannot be in the future' }
  }

  if (!past && inputDate < today) {
    return { isValid: false, error: 'Date cannot be in the past' }
  }

  // Age validation for birth dates
  if (minAge > 0 || maxAge < 150) {
    const age = Math.floor((today - inputDate) / (365.25 * 24 * 60 * 60 * 1000))
    
    if (age < minAge) {
      return { isValid: false, error: `You must be at least ${minAge} years old` }
    }
    
    if (age > maxAge) {
      return { isValid: false, error: `Age cannot exceed ${maxAge} years` }
    }
  }

  return { isValid: true, error: null }
}

// Form validation helper
export const validateForm = (data, rules) => {
  const errors = {}
  let isValid = true

  Object.keys(rules).forEach(field => {
    const value = data[field]
    const fieldRules = rules[field]

    for (const rule of fieldRules) {
      const result = rule(value)
      if (!result.isValid) {
        errors[field] = result.error
        isValid = false
        break // Stop at first error for this field
      }
    }
  })

  return { isValid, errors }
}

// Sanitize input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Password strength checker
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, feedback: 'Enter a password' }

  let score = 0
  const feedback = []

  // Length check
  if (password.length >= 8) score += 1
  else feedback.push('Use at least 8 characters')

  if (password.length >= 12) score += 1
  else feedback.push('Use 12+ characters for better security')

  // Character variety
  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Add lowercase letters')

  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Add uppercase letters')

  if (/\d/.test(password)) score += 1
  else feedback.push('Add numbers')

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1
  else feedback.push('Add special characters')

  // Common patterns (reduce score)
  if (/(.)\1{2,}/.test(password)) {
    score -= 1
    feedback.push('Avoid repeated characters')
  }

  if (/123|abc|qwerty|password/i.test(password)) {
    score -= 2
    feedback.push('Avoid common patterns')
  }

  const strength = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][Math.max(0, Math.min(5, score))]
  
  return {
    score: Math.max(0, score),
    strength,
    feedback: feedback.slice(0, 3) // Limit feedback to 3 items
  }
}