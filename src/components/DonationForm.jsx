import React, { useState } from 'react';

const DonationForm = () => {
    const [formData, setFormData] = useState({
        location: '',
        donorName: '',
        items: [],
        currentItem: '',
        weight: '',
        quantity: ''
    });

    const handleAddItem = () => {
        if (formData.currentItem && formData.quantity) {
            setFormData(prev => ({
                ...prev,
                items: [...prev.items, {
                    name: prev.currentItem,
                    weight: prev.weight,
                    quantity: prev.quantity
                }],
                currentItem: '',
                weight: '',
                quantity: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const response = await fetch('/api/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userEmail: user.email
                }),
            });

            if (response.ok) {
                alert('Donation submitted successfully!');
                setFormData({
                    location: '',
                    donorName: '',
                    items: [],
                    currentItem: '',
                    weight: '',
                    quantity: ''
                });
            } else {
                alert('Failed to submit donation.');
            }
        } catch (error) {
            console.error('Error submitting donation:', error);
            alert('Error submitting donation.');
        }
    };

    return (
        <div className="container fade-in" style={{ padding: '40px 20px' }}>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                    <h2 style={{ color: 'var(--primary)' }}>New Donation Entry</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Please fill in the details of the items you are donating.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label className="form-label">Donor Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.donorName}
                                onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="City, UK"
                                required
                            />
                        </div>
                    </div>

                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: 'var(--radius)', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Add Items</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label" style={{ fontSize: '0.9rem' }}>Item Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.currentItem}
                                    onChange={(e) => setFormData({ ...formData, currentItem: e.target.value })}
                                    placeholder="e.g. Canned Food"
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label" style={{ fontSize: '0.9rem' }}>Weight (kg)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    placeholder="0.0"
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label" style={{ fontSize: '0.9rem' }}>Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    placeholder="0"
                                />
                            </div>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleAddItem}
                                style={{ height: '48px' }}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {formData.items.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Items List</h4>
                            <div style={{ border: '1px solid #eee', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8f9fa' }}>
                                        <tr>
                                            <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Item</th>
                                            <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Weight</th>
                                            <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.items.map((item, index) => (
                                            <tr key={index} style={{ borderTop: '1px solid #eee' }}>
                                                <td style={{ padding: '12px' }}>{item.name}</td>
                                                <td style={{ padding: '12px' }}>{item.weight} kg</td>
                                                <td style={{ padding: '12px' }}>{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary" style={{ minWidth: '200px' }}>
                            Submit Donation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DonationForm;
