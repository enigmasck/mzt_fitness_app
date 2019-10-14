module.exports = (app) => {	
    const customers = require('../controllers/customer.controller.js');

    // Retrieve all customers
    app.get('/customers', customers.findAll);

    // Retrieve one customer
    app.get('/customers/:customerId', customers.findOne);
    
    // Create a new customer
    app.post('/customers', customers.create);
    
    // Update a customer with customerId
    app.put('/customers/:customerId', customers.update);

   // Delete a customer with customerId
    app.delete('/customers/:customerId', customers.delete);
};