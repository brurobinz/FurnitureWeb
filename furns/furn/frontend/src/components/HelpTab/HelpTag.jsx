import { useState } from 'react';
import axios from 'axios';
import './HelpTag.css';

// eslint-disable-next-line react/prop-types
const HelpTab = ({ setShowHelpTab }) => {
  const [formData, setFormData] = useState({ name: '', email: '', helpType: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post('http://localhost:4000/api/help', formData);
      setMessage('Thank you for your offer to help! We are able to make a respond soon');
      setFormData({ name: '', email: '', helpType: '', description: '' });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Error submitting your help offer. Please try again.');
    }
  };

  return (
    <div className="help-tab">
      <button onClick={() => setShowHelpTab(false)} className="close-button">X</button>
      <h3>Offer Your Help</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
        <select name="helpType" value={formData.helpType} onChange={handleChange} required>
          <option value="">Select Help Type</option>
          <option value="Technical">Technical</option>
          <option value="Tutoring">Tutoring</option>
          <option value="Community Support">Community Support</option>
        </select>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe how you can help" required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HelpTab;
