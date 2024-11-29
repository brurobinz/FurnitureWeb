import HelpRequest from '../models/HelpModel.js';

// Function to handle creating a new Help Request
export const createHelpRequest = async (req, res) => {
  const { name, email, helpType, description } = req.body;

  try {
    // Create a new HelpRequest document
    const newHelpRequest = new HelpRequest({
      name,
      email,
      helpType,
      description
    });

    // Save to the database
    await newHelpRequest.save();
    res.status(201).json({ message: 'Help request saved successfully!' });
  } catch (error) {
    console.error('Error saving help request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
