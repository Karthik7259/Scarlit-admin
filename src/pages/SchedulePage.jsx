

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, X, Tag, Palette, Zap, CheckCircle } from 'lucide-react';
import Header from '../Components/common/Header.jsx';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SchedulePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    sizes: [],
    colours: []
  });
  // Mode: 'product' (default) or 'user' for Add User form
  const [formMode, setFormMode] = useState('product');
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '' });
  const [sizeInput, setSizeInput] = useState('');
  const [colourInput, setColourInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSize = () => {
    if (sizeInput.trim() && !formData.sizes.includes(sizeInput.trim())) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, sizeInput.trim()]
      }));
      setSizeInput('');
    }
  };

  const removeSize = (sizeToRemove) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(size => size !== sizeToRemove)
    }));
  };

  const addColour = () => {
    if (colourInput.trim() && !formData.colours.includes(colourInput.trim())) {
      setFormData(prev => ({
        ...prev,
        colours: [...prev.colours, colourInput.trim()]
      }));
      setColourInput('');
    }
  };

  const removeColour = (colourToRemove) => {
    setFormData(prev => ({
      ...prev,
      colours: prev.colours.filter(colour => colour !== colourToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Branch behavior depending on mode
    if (formMode === 'product') {
      if (!formData.name || !formData.brand || formData.sizes.length === 0 || formData.colours.length === 0) {
        toast.error('Please fill all product fields and add at least one size and colour');
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await axios.post('https://scarlit-backend.onrender.com/api/products/create', formData);
        if (response.data?.success) {
          toast.success('Product created successfully! 🎉');
          setFormData({ name: '', brand: '', sizes: [], colours: [] });
          setSizeInput('');
          setColourInput('');
        } else {
          toast.error(response.data?.message || 'Failed to create product');
        }
      } catch (error) {
        console.error('Error creating product:', error);
        const errorMessage = error.response?.data?.message || 'Failed to create product. Please try again.';
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    } else if (formMode === 'user') {
      // Create user flow
      if (!userForm.name || !userForm.email || !userForm.password) {
        toast.error('Please fill all user fields (name, email, password)');
        return;
      }

      setIsSubmitting(true);
      try {
        // Assumption: backend user creation endpoint is /api/users/create
        const response = await axios.post('https://scarlit-backend.onrender.com/api/user/signup', userForm);
        if (response.data?.success) {
          toast.success('User created successfully!');
          setUserForm({ name: '', email: '', password: '' });
        } else {
          toast.error(response.data?.message || 'Failed to create user');
        }
      } catch (error) {
        console.error('Error creating user:', error);
        const errorMessage = error.response?.data?.message || 'Failed to create user. Please try again.';
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <Header title={formMode === 'product' ? 'Create New Product' : 'Add User'} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <motion.div
        className="max-w-2xl mx-auto py-8 px-4 lg:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Card */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 mb-8 text-white"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Package size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{formMode === 'product' ? 'Create New Product' : 'Add User'}</h1>
              <p className="text-blue-100">{formMode === 'product' ? 'Fill in the details below to add a new product to your inventory' : 'Enter the user information to create a new account'}</p>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Mode selector */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-black">Form Type:</label>
              <select
                value={formMode}
                onChange={(e) => setFormMode(e.target.value)}
                className="border border-gray-200 rounded px-3 py-2 text-sm text-black bg-white"
              >
                <option value="product">Create Product</option>
                <option value="user">Add User</option>
              </select>
            </div>
            {/* Product Name (shown only in product mode) */}
            {formMode === 'product' && (
            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Tag size={18} className="mr-2 text-blue-600" />
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                  focusedField === 'name' 
                    ? 'border-blue-500 ring-4 ring-blue-100' 
                    : 'border-gray-200 hover:border-gray-300'
                } focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100`}
                placeholder="e.g., Premium Cotton Hoodie"
                required
              />
            </div>
            )}

            {/* User form (shown only in user mode) */}
            {formMode === 'user' && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 mb-2">Add User</label>
                <input
                  type="text"
                  name="user-name"
                  value={userForm.name}
                  onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border-2 rounded-xl text-gray-900"
                  placeholder="Full name"
                  required
                />
                <input
                  type="email"
                  name="user-email"
                  value={userForm.email}
                  onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border-2 rounded-xl text-gray-900"
                  placeholder="Email address"
                  required
                />
                <input
                  type="password"
                  name="user-password"
                  value={userForm.password}
                  onChange={(e) => setUserForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 border-2 rounded-xl text-gray-900"
                  placeholder="Temporary password"
                  required
                />
              </div>
            )}

            {/* Brand (product mode only) */}
            {formMode === 'product' && (
            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Zap size={18} className="mr-2 text-orange-600" />
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('brand')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                  focusedField === 'brand' 
                    ? 'border-orange-500 ring-4 ring-orange-100' 
                    : 'border-gray-200 hover:border-gray-300'
                } focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100`}
                placeholder="e.g., Nike, Adidas, Supreme"
                required
              />
            </div>
            )}

            {/* Sizes (product mode only) */}
            {formMode === 'product' && (
            <div className="space-y-4">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">
                  S
                </span>
                Available Sizes
              </label>
              
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                  onFocus={() => setFocusedField('sizes')}
                  onBlur={() => setFocusedField(null)}
                  className={`flex-1 px-4 py-3 border-2 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    focusedField === 'sizes' 
                      ? 'border-blue-500 ring-4 ring-blue-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  } focus:outline-none`}
                  placeholder="Enter size (e.g., S, M, L, XL)"
                />
                <motion.button
                  type="button"
                  onClick={addSize}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus size={20} />
                  <span className="font-semibold">Add</span>
                </motion.button>
              </div>
              
              <AnimatePresence>
                {formData.sizes.length > 0 && (
                  <motion.div 
                    className="flex flex-wrap gap-3 pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {formData.sizes.map((size) => (
                      <motion.span
                        key={size}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200 shadow-sm"
                      >
                        {size}
                        <button
                          type="button"
                          onClick={() => removeSize(size)}
                          className="ml-2 p-1 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            )}
            
            {/* Colours (product mode only) */}
            {formMode === 'product' && (
            <div className="space-y-4">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Palette size={18} className="mr-2 text-green-600" />
                Available Colours
              </label>
              
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={colourInput}
                  onChange={(e) => setColourInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColour())}
                  onFocus={() => setFocusedField('colours')}
                  onBlur={() => setFocusedField(null)}
                  className={`flex-1 px-4 py-3 border-2 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    focusedField === 'colours' 
                      ? 'border-green-500 ring-4 ring-green-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  } focus:outline-none`}
                  placeholder="Enter colour (e.g., Black, Navy Blue, Red)"
                />
                <motion.button
                  type="button"
                  onClick={addColour}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus size={20} />
                  <span className="font-semibold">Add</span>
                </motion.button>
              </div>
              
              <AnimatePresence>
                {formData.colours.length > 0 && (
                  <motion.div 
                    className="flex flex-wrap gap-3 pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {formData.colours.map((colour) => (
                      <motion.span
                        key={colour}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200 shadow-sm"
                      >
                        {colour}
                        <button
                          type="button"
                          onClick={() => removeColour(colour)}
                          className="ml-2 p-1 rounded-full hover:bg-green-200 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            )}
            
            {/* Submit Button */}
            <motion.div 
              className="flex justify-end pt-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 shadow-lg transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Package size={24} />
                    </motion.div>
                    <span>{formMode === 'product' ? 'Creating Product...' : 'Creating User...'}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={24} />
                    <span>{formMode === 'product' ? 'Create Product' : 'Create User'}</span>
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </div>

        {/* Form Status */}
        <motion.div 
          className="mt-6 text-center text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {formMode === 'product' ? (
            <p>✓ All fields are required • ✓ Add at least one size and colour • ✓ Product will be available immediately</p>
          ) : (
            <p>✓ All fields are required • ✓ Temporary password will be sent to the user • ✓ You can change their password later</p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SchedulePage;