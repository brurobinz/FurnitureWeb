import mongoose from 'mongoose'
const helpRequestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Vui lòng sử dụng địa chỉ email hợp lệ.'] 
  },
  helpType: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status: { type: String, default: 'pending' },  // Trạng thái yêu cầu
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  response: { type: String },                     // Phản hồi từ admin
  respondedAt: { type: Date },                    // Thời gian phản hồi
  createdAt: { type: Date, default: Date.now }
});

const HelpRequest = mongoose.model('HelpRequest', helpRequestSchema);

export default HelpRequest;
