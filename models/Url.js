import mongoose, { mongo }  from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl :{
    type : String,
    required :[true, 'Original URL is required'],
    trim : true
  },
  shortId:{
    type : String,
    required : true,
    unique: true,
    trim : true
  },
  userId:{
    type : mongoose.Schema.Types.ObjectId,
    ref:'User',
    required : true
  },
  clickCount:{
    type : Number,
    default: 0
  },
  createdAt:{
    type : Date,
    default:Date.now
  }
})

// Index for faster queries
urlSchema.index({ userId: 1, createdAt: -1 });
urlSchema.index({ shortId: 1 });

const Url = mongoose.model('Url', urlSchema);
export default Url;