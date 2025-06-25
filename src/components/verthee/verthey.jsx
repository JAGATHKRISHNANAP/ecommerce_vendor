// src/components/auth/NameRegistration.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeRegistration } from '../../redux/slices/authSlices';
import { validateName } from '../../utils/validation';
import ErrorMessage from '../ui/ErrorMessage';
import LoadingSpinner from '../ui/LoadingSpinner';

const NameRegistration = () => {
  const dispatch = useDispatch();
  const { isLoading, error, phoneNumber } = useSelector(state => state.auth);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (nameError) setNameError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateName(name, 'Name');
    if (!validation.isValid) {
      setNameError(validation.error);
      return;
    }

    dispatch(completeRegistration({
      phoneNumber,
      name: name.trim(),
    }));
  };

  return (
    <div>
      <h2>Welcome! Let's get to know you</h2>
      <p>Please enter your name to complete registration</p>
      <p>Phone verified: {phoneNumber}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your full name"
            disabled={isLoading}
            autoFocus
          />
          {nameError && <div>{nameError}</div>}
        </div>

        {error && <ErrorMessage message={error} />}

        <button type="submit" disabled={isLoading || !name.trim()}>
          {isLoading ? (
            <>
              <LoadingSpinner size="small" color="white" />
              <span>Creating your account...</span>
            </>
          ) : (
            <>
              <span>Complete Registration</span>
            </>
          )}
        </button>
      </form>

      <p>Your information is secure and will only be used to personalize your experience</p>
    </div>
  );
};

export default NameRegistration;