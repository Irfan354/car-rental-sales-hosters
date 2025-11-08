"use client";
// components/CreateAccount.js
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function CreateAccount({ onBackToSignIn, onCreateAccountSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    address: '',
    state: '',
    city: '',
    zipcode: ''
  });

  const states = [
    { label: 'California', value: 'CA' },
    { label: 'New York', value: 'NY' },
    { label: 'Texas', value: 'TX' }
  ];

  const cities = {
    CA: [{ label: 'Los Angeles', value: 'LA' }, { label: 'San Francisco', value: 'SF' }],
    NY: [{ label: 'New York City', value: 'NYC' }, { label: 'Buffalo', value: 'BUF' }],
    TX: [{ label: 'Houston', value: 'HOU' }, { label: 'Dallas', value: 'DAL' }]
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating account:', formData);
    onCreateAccountSuccess();
  };

  const header = (
    <div className="text-center">
      <h2 className="text-900 font-bold text-3xl mb-1">Create Account</h2>
    </div>
  );

  return (
    <Card header={header} className="w-full md:w-40rem">
      <form onSubmit={handleSubmit} className="flex flex-column gap-3">
        <div className="grid">
          <div className="col-12 md:col-6">
            <label htmlFor="name" className="block text-900 font-medium mb-2">
              Name *
            </label>
            <InputText
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full"
              required
            />
          </div>
          <div className="col-12 md:col-6">
            <label htmlFor="mobile" className="block text-900 font-medium mb-2">
              Mobile Number *
            </label>
            <InputText
              id="mobile"
              value={formData.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              placeholder="Enter 10-digit mobile number"
              className="w-full"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-900 font-medium mb-2">
            Email Address *
          </label>
          <InputText
            id="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email address"
            className="w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Create Password *
          </label>
          <Password
            id="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Enter password (min 8 characters)"
            className="w-full"
            toggleMask
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-900 font-medium mb-2">
            Address *
          </label>
          <InputText
            id="address"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Enter your complete address"
            className="w-full"
            required
          />
        </div>

        <div className="grid">
          <div className="col-12 md:col-4">
            <label htmlFor="state" className="block text-900 font-medium mb-2">
              State *
            </label>
            <Dropdown
              id="state"
              value={formData.state}
              onChange={(e) => handleChange('state', e.value)}
              options={states}
              placeholder="Select State"
              className="w-full"
              required
            />
          </div>
          <div className="col-12 md:col-4">
            <label htmlFor="city" className="block text-900 font-medium mb-2">
              City *
            </label>
            <Dropdown
              id="city"
              value={formData.city}
              onChange={(e) => handleChange('city', e.value)}
              options={cities[formData.state] || []}
              placeholder="Select City"
              className="w-full"
              disabled={!formData.state}
              required
            />
          </div>
          <div className="col-12 md:col-4">
            <label htmlFor="zipcode" className="block text-900 font-medium mb-2">
              Zipcode *
            </label>
            <InputText
              id="zipcode"
              value={formData.zipcode}
              onChange={(e) => handleChange('zipcode', e.target.value)}
              placeholder="Enter zipcode"
              className="w-full"
              required
            />
          </div>
        </div>

        <Button label="Create Account" type="submit" className="w-full" />

        <div className="text-center">
          <span className="text-600">Already have an account? </span>
          <a 
            href="#" 
            className="text-primary font-medium no-underline"
            onClick={onBackToSignIn}
          >
            Sign In
          </a>
        </div>
      </form>
    </Card>
  );
}