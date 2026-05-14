const mongoose = require('mongoose');

const BloodRequestSchema = new mongoose.Schema({
    patientFirstName: { type: String, required: true },
    patientLastName: { type: String, required: true },
    bystanderName: { type: String, required: true },
    bystanderMobile: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    quantity: { type: Number, required: true },
    requiredDate: { type: String, required: true },
    district: { type: String, required: true },
    hospital: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // Pending, Approved, Completed
    requestedBy: { type: String }, // Email of the user who requested
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BloodRequest', BloodRequestSchema);