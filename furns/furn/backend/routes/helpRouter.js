// routes/helpRoutes.js
import express from 'express';
import HelpRequest from '../models/HelpModel.js';

const router = express.Router();

// GET all help requests
router.get('/', async (req, res) => {
  try {
    const helpRequests = await HelpRequest.find();
    res.status(200).json(helpRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving help requests' });
  }
});
router.post('/', async (req, res) => {
    try {
      const newHelpRequest = new HelpRequest(req.body);
      await newHelpRequest.save();
      res.status(201).json(newHelpRequest);
    } catch (error) {
      res.status(500).json({ message: 'Error saving help request', error });
    }
  });

// Add this at the end of the file
export default router;
