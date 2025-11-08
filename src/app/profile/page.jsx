'use client';
import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { registerHoster } from '@/app/lib/hosterService';

const HosterProfilePage = () => {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);

  // State & City dropdowns - FIXED: Using numeric IDs
  const states = [
    { name: "Andhra Pradesh", id: 1 },
    { name: "Telangana", id: 2 },
    { name: "Maharashtra", id: 3 },
    { name: "Karnataka", id: 4 },
    { name: "Tamil Nadu", id: 5 },
  ];

  const cities = [
    { name: "Hyderabad", id: 1 },
    { name: "Mumbai", id: 2 },
    { name: "Bengaluru", id: 3 },
    { name: "Chennai", id: 4 },
    { name: "Pune", id: 5 },
  ];

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    alternateMobile: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    aadharNumber: '',
    panNumber: '',
    user: { id: 2 },
  });

  // File data
  const [files, setFiles] = useState({
    profilePic: null,
    panCard: null,
    aadharFront: null,
    aadharBack: null,
  });

  // File input refs
  const fileInputRefs = {
    profilePic: useRef(null),
    panCard: useRef(null),
    aadharFront: useRef(null),
    aadharBack: useRef(null),
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle file selection
  const handleFileSelect = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showError('Please select an image file');
        return;
      }

      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        showError('File size should be less than 2MB');
        return;
      }

      setFiles((prev) => ({ ...prev, [field]: file }));
      showSuccess(`${field.replace(/([A-Z])/g, ' $1')} selected successfully`);
    }
  };

  // Trigger file input click
  const triggerFileInput = (field) => {
    fileInputRefs[field].current?.click();
  };

  // Remove selected file
  const removeFile = (field) => {
    setFiles((prev) => ({ ...prev, [field]: null }));
    if (fileInputRefs[field].current) {
      fileInputRefs[field].current.value = '';
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required files
      if (!files.profilePic || !files.panCard || !files.aadharFront || !files.aadharBack) {
        showError('Please upload all required documents');
        setLoading(false);
        return;
      }

      // Create FormData
      const data = new FormData();
      data.append('name', formData.name);
      data.append('mobile', formData.mobile);
      data.append('email', formData.email);
      data.append('alternateMobile', formData.alternateMobile);
      data.append('address', formData.address);
      data.append('pincode', formData.pincode);
      data.append('aadharNumber', formData.aadharNumber);
      data.append('panNumber', formData.panNumber);
      data.append('userId', formData.user.id);
      data.append('stateId', formData.state?.id || '');
      data.append('cityId', formData.city?.id || '');

      // Add files
      Object.entries(files).forEach(([key, file]) => {
        if (file) data.append(key, file);
      });

      await registerHoster(data);
      showSuccess('Hoster profile registered successfully!');
      resetForm();
    } catch (error) {
      console.error('Error during hoster registration:', error);
      showError('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      mobile: '',
      email: '',
      alternateMobile: '',
      address: '',
      state: '',
      city: '',
      pincode: '',
      aadharNumber: '',
      panNumber: '',
      user: { id: 6 },
    });
    setFiles({
      profilePic: null,
      panCard: null,
      aadharFront: null,
      aadharBack: null,
    });
    
    // Reset all file inputs
    Object.values(fileInputRefs).forEach(ref => {
      if (ref.current) ref.current.value = '';
    });
  };

  // Toast helpers
  const showSuccess = (msg) => toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
  const showError = (msg) => toast.current.show({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });

  // File Upload Field component
  const FileUploadField = ({ label, field }) => (
    <div className="field">
      <label htmlFor={field} className="font-bold block mb-2">{label} *</label>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRefs[field]}
        onChange={(e) => handleFileSelect(field, e)}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      <div className="flex flex-column gap-2">
        <Button
          type="button"
          icon="pi pi-image"
          label={`Choose ${label}`}
          onClick={() => triggerFileInput(field)}
          className="p-button-outlined"
        />
        
        {files[field] && (
          <div className="flex align-items-center gap-2 p-2 border-1 border-round" style={{ borderColor: '#dee2e6' }}>
            <i className="pi pi-file" style={{ color: 'var(--primary-color)' }}></i>
            <span className="text-sm flex-1">{files[field].name}</span>
            <Button
              type="button"
              icon="pi pi-times"
              className="p-button-text p-button-danger p-button-sm"
              onClick={() => removeFile(field)}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-fluid p-p-4" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Toast ref={toast} />
      <Card title="Hoster Profile Registration">
        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <h3>Personal Details</h3>
          <Divider />
          <div className="p-grid">
            <div className="field p-col-12 p-md-6">
              <label htmlFor="name">Full Name *</label>
              <InputText 
                id="name"
                value={formData.name} 
                onChange={(e) => handleChange('name', e.target.value)} 
                required 
              />
            </div>
            <div className="field p-col-12 p-md-6">
              <label htmlFor="mobile">Mobile *</label>
              <InputText 
                id="mobile"
                value={formData.mobile} 
                onChange={(e) => handleChange('mobile', e.target.value)} 
                required 
              />
            </div>
            <div className="field p-col-12 p-md-6">
              <label htmlFor="email">Email *</label>
              <InputText 
                id="email"
                type="email" 
                value={formData.email} 
                onChange={(e) => handleChange('email', e.target.value)} 
                required 
              />
            </div>
            <div className="field p-col-12 p-md-6">
              <label htmlFor="alternateMobile">Alternate Mobile</label>
              <InputText 
                id="alternateMobile"
                value={formData.alternateMobile} 
                onChange={(e) => handleChange('alternateMobile', e.target.value)} 
              />
            </div>
            <div className="field p-col-12">
              <label htmlFor="address">Address</label>
              <InputTextarea 
                id="address"
                rows={2} 
                value={formData.address} 
                onChange={(e) => handleChange('address', e.target.value)} 
              />
            </div>
            <div className="field p-col-12 p-md-4">
              <label htmlFor="state">State *</label>
              <Dropdown 
                id="state"
                value={formData.state} 
                options={states} 
                optionLabel="name" 
                onChange={(e) => handleChange('state', e.value)} 
                placeholder="Select State" 
              />
            </div>
            <div className="field p-col-12 p-md-4">
              <label htmlFor="city">City *</label>
              <Dropdown 
                id="city"
                value={formData.city} 
                options={cities} 
                optionLabel="name" 
                onChange={(e) => handleChange('city', e.value)} 
                placeholder="Select City" 
              />
            </div>
            <div className="field p-col-12 p-md-4">
              <label htmlFor="pincode">Pincode *</label>
              <InputText 
                id="pincode"
                value={formData.pincode} 
                onChange={(e) => handleChange('pincode', e.target.value)} 
                required 
              />
            </div>
          </div>

          {/* Document Details */}
          <h3>Document Details</h3>
          <Divider />
          <div className="p-grid">
            <div className="field p-col-12 p-md-6">
              <label htmlFor="aadharNumber">Aadhar Number *</label>
              <InputText 
                id="aadharNumber"
                value={formData.aadharNumber} 
                onChange={(e) => handleChange('aadharNumber', e.target.value)} 
                required 
              />
            </div>
            <div className="field p-col-12 p-md-6">
              <label htmlFor="panNumber">PAN Number *</label>
              <InputText 
                id="panNumber"
                value={formData.panNumber} 
                onChange={(e) => handleChange('panNumber', e.target.value)} 
                required 
              />
            </div>
          </div>

          {/* File Uploads */}
          <h3>Upload Documents</h3>
          <Divider />
          <div className="p-grid">
            <div className="p-col-12 p-md-6">
              <FileUploadField label="Profile Picture" field="profilePic" />
            </div>
            <div className="p-col-12 p-md-6">
              <FileUploadField label="PAN Card" field="panCard" />
            </div>
            <div className="p-col-12 p-md-6">
              <FileUploadField label="Aadhar Front" field="aadharFront" />
            </div>
            <div className="p-col-12 p-md-6">
              <FileUploadField label="Aadhar Back" field="aadharBack" />
            </div>
          </div>

          <div className="flex justify-content-end mt-4">
            <Button 
              type="submit" 
              label="Submit Profile" 
              icon="pi pi-check" 
              loading={loading} 
              className="p-button-primary" 
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default HosterProfilePage;