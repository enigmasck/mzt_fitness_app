module.exports = (app) => {	
    const sessions = require('../controllers/session.controller.js');

    // Retrieve all sessions
    app.get('/sessions', sessions.findAll);

    // Retrieve one session
    app.get('/sessions/:sessionId', sessions.findOne);

    // Create a new session
    app.post('/sessions', sessions.create);
    
    // Update a session with sessionId
    app.put('/sessions/:sessionId', sessions.update);
    
   // Delete a session with sessionId
    app.delete('/sessions/:sessionId', sessions.delete);
};