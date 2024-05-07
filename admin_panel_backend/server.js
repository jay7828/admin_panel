const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const customersRoutes = require('./routes/customers');
const purchaseOrdersRoutes = require('./routes/purchaseOrders');
const shippingDetailsRoutes = require('./routes/shippingDetails');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://jay:jay7828@cluster0.tto8jus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/purchaseOrders', purchaseOrdersRoutes);
app.use('/api/shippingDetails', shippingDetailsRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
