const express = require('express');
const router = express.Router();
const ShippingDetails = require('../models/ShippingDetails');

// Create new shipping details
router.post('/', async (req, res) => {
  try {
    const { address, city, pincode, purchaseOrder, customer } = req.body;
    const newShippingDetails = new ShippingDetails({ address, city, pincode, purchaseOrder, customer });
    await newShippingDetails.save();
    res.status(201).json(newShippingDetails);
  } catch (error) {
    console.error('Error creating shipping details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all shipping details
router.get('/', async (req, res) => {
  try {
    const shippingDetails = await ShippingDetails.find();
    res.json(shippingDetails);
  } catch (error) {
    console.error('Error getting shipping details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get shipping details by ID
router.get('/:id', async (req, res) => {
  try {
    const shippingDetails = await ShippingDetails.findById(req.params.id);
    if (!shippingDetails) {
      return res.status(404).json({ message: 'Shipping details not found' });
    }
    res.json(shippingDetails);
  } catch (error) {
    console.error('Error getting shipping details by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update shipping details
router.put('/:id', async (req, res) => {
  try {
    const { address, city, pincode, purchaseOrder, customer } = req.body;
    const updatedShippingDetails = await ShippingDetails.findByIdAndUpdate(req.params.id, { address, city, pincode, purchaseOrder, customer}, { new: true });
    if (!updatedShippingDetails) {
      return res.status(404).json({ message: 'Shipping details not found' });
    }
    res.json(updatedShippingDetails);
  } catch (error) {
    console.error('Error updating shipping details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete shipping details
router.delete('/:id', async (req, res) => {
  try {
    const deletedShippingDetails = await ShippingDetails.findByIdAndDelete(req.params.id);
    if (!deletedShippingDetails) {
      return res.status(404).json({ message: 'Shipping details not found' });
    }
    res.json({ message: 'Shipping details deleted successfully' });
  } catch (error) {
    console.error('Error deleting shipping details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
