import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    donorName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    items: [{
        name: String,
        weight: Number,
        quantity: Number
    }],
    totalWeight: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Donation = mongoose.model('Donation', donationSchema);
export { Donation };
export default Donation;
