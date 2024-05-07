const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../models/PurchaseOrders');

// Create a new purchase order
router.post('/', async (req, res) => {
  try {
    const { productName, quantity, pricing, mrp, customer } = req.body;
    const newPurchaseOrder = new PurchaseOrder({ productName, quantity, pricing, mrp, customer });
    await newPurchaseOrder.save();
    res.status(201).json(newPurchaseOrder);
  } catch (error) {
    console.error('Error creating purchase order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all purchase orders
router.get('/', async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find();
    res.json(purchaseOrders);
  } catch (error) {
    console.error('Error getting purchase orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get purchase order by ID
router.get('/:id', async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.json(purchaseOrder);
  } catch (error) {
    console.error('Error getting purchase order by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update purchase order
router.put('/:id', async (req, res) => {
  try {
    const { productName, quantity, pricing, mrp, customer } = req.body;
    const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id, { productName, quantity, pricing, mrp, customer }, { new: true });
    if (!updatedPurchaseOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.json(updatedPurchaseOrder);
  } catch (error) {
    console.error('Error updating purchase order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete purchase order
router.delete('/:id', async (req, res) => {
  try {
    const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!deletedPurchaseOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.json({ message: 'Purchase order deleted successfully' });
  } catch (error) {
    console.error('Error deleting purchase order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
