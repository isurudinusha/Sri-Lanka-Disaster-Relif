import express from 'express';
import Donation from '../models/Donation.js';

const router = express.Router();

// GET /api/donations - Get all donations (or recent ones)
router.get('/', async (req, res) => {
    try {
        const donations = await Donation.find().sort({ date: -1 }).limit(10);
        const totalStats = await Donation.aggregate([
            {
                $group: {
                    _id: null,
                    totalWeight: { $sum: '$totalWeight' },
                    totalItems: { $sum: { $size: '$items' } },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            recent: donations,
            stats: totalStats[0] || { totalWeight: 0, totalItems: 0, count: 0 }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/donations - Create a new donation
router.post('/', async (req, res) => {
    const { donorName, location, items, userEmail } = req.body;

    const totalWeight = items.reduce((acc, item) => acc + (Number(item.weight) || 0), 0);

    const donation = new Donation({
        donorName,
        userEmail,
        location,
        items,
        totalWeight
    });

    try {
        const newDonation = await donation.save();
        res.status(201).json(newDonation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /api/donations/user/:email - Get donations for a specific user
router.get('/user/:email', async (req, res) => {
    try {
        const donations = await Donation.find({ userEmail: req.params.email }).sort({ date: -1 });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
