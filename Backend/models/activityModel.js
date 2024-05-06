const mongoose = require("mongoose");
const activitySchema = mongoose.Schema({
   
    description: {
      type: String,
      require:true
    },
    duration: {
      type: Number,
      require:true
    },
    date: {
      type: String,
      require:true
    },
    trainerType: {
      type: String,
      require:true
    },

    activityType: {
      type: String,
      require:true
    },

    amount: {
      type: Number,
      require:true
    },


  });
  module.exports = mongoose.model("activitydetails", activitySchema);