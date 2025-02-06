import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';  
import "./UserForm.css";   
type FormValues = {
  name: string;
  email: string;
  address: string;
  phone: string;
};

const UserForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<FormValues>();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const userId = uuidv4();  // Now works correctly
    const userData = { ...data, id: userId };

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = [...existingUsers, userData];

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    reset();
    setShowWarning(false);
    alert('User data saved successfully!');
  };

  return (
    <div className="form-container">
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            {...register("name", { 
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" }
            })} 
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email"
            {...register("email", { 
              required: "Email is required",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
            })} 
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input 
            {...register("address", { 
              required: "Address is required",
              minLength: { value: 5, message: "Address must be at least 5 characters" }
            })} 
          />
          {errors.address && <span className="error">{errors.address.message}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input 
            type="tel"
            {...register("phone", { 
              required: "Phone number is required",
              pattern: { value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, message: "Invalid phone number" }
            })} 
          />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">Save User</button>
          <button 
            type="button" 
            className="reset-btn"
            onClick={() => {
              if (isDirty) {
                const confirm = window.confirm('You have unsaved changes. Are you sure?');
                if (confirm) reset();
              } else {
                reset();
              }
            }}
          >
            Reset Form
          </button>
        </div>
      </form>

      {showWarning && (
        <div className="warning-modal">
          <p>You have unsaved changes! Are you sure you want to leave?</p>
        </div>
      )}
    </div>
  );
};

export default UserForm;
