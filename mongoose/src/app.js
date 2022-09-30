const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/restapi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successful!"))
  .catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
  roll: { type: Number, required: true },
  name: String,
  department: String,
  active: Boolean,
  dob: {
    type: Date,
    default: Date.now,
  },
});

const Student = new mongoose.model("Student", studentSchema);
