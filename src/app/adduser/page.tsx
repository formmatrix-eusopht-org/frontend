'use client';
import React, { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './styles.css'; // Import the CSS file

export default function AddUser() {
  const router = useRouter();
  type FormData = {
    name: string;
    address: string;
    email: string;
    password: string;
    confirmPassword: string;
    trialPeriod: number | string;
  };

  type Errors = {
    name?: string;
    address?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    trialPeriod?: string;
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    trialPeriod: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });
  const [showPassword, setShowPassword] = useState(false);

  useLayoutEffect(() => {
    const role = JSON.parse(localStorage.getItem('userRole') || '0');
    if (role !== 0) {
      router.push('/home');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Trial period validation
    if (formData.trialPeriod === '') {
      newErrors.trialPeriod = 'Trial period is required';
    } else if (Number(formData.trialPeriod) <= 0) {
      newErrors.trialPeriod = 'Trial period must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage({ type: '', message: '' });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/adduser`,
        {
          name: formData.name,
          address: formData.address,
          email: formData.email,
          password: formData.password,
          trialPeriod: Number(formData.trialPeriod),
        },
      );

      setSubmitMessage({
        type: 'success',
        message: 'User added successfully!',
      });

      setFormData({
        name: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
        trialPeriod: '',
      });
    } catch (error: any) {
      let errorMessage = 'Failed to add user';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setSubmitMessage({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <h1 className="login-CompanyName">FormMatic</h1>
        <p className="login-companySlogan">From Data to Documents in Seconds.</p>
        <h2 className="login-SignIn">Add User</h2>

        {submitMessage.message && (
          <div
            className={`errorLogin visible ${
              submitMessage.type === 'success' ? 'text-success' : 'text-error'
            }`}
          >
            {submitMessage.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="usernameInput"
              placeholder="Name"
            />
            {errors.name && <p className="errorLogin visible">{errors.name}</p>}
          </div>

          <div className="form-group">
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="usernameInput"
              placeholder="Address"
            />
            {errors.address && <p className="errorLogin visible">{errors.address}</p>}
          </div>

          <div className="form-group">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="usernameInput"
              placeholder="Email Address"
            />
            {errors.email && <p className="errorLogin visible">{errors.email}</p>}
          </div>

          <div className="form-group">
            <input
              id="trialPeriod"
              name="trialPeriod"
              type="number"
              value={formData.trialPeriod}
              onChange={handleChange}
              className="usernameInput"
              placeholder="Trial Period (in days)"
            />
            {errors.trialPeriod && <p className="errorLogin visible">{errors.trialPeriod}</p>}
          </div>

          <div className="form-group">
            <div className="input-container-forIcon">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className="passwordInput"
                placeholder="Password"
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="errorLogin visible">{errors.password}</p>}
          </div>

          <div className="form-group">
            <div className="input-container-forIcon">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="passwordInput"
                placeholder="Confirm Password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="errorLogin visible">{errors.confirmPassword}</p>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" disabled={isSubmitting} className="loginButton">
              {isSubmitting ? 'Adding User...' : 'Add User'}
            </button>
            <button type="button" disabled={isSubmitting} onClick={() => router.push('/home')} className="loginButton">
              Cancel
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}
