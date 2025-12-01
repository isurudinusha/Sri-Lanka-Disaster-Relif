import React, { useState, useEffect } from 'react';

const MyDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.email) {
            fetch(`/api/donations/user/${encodeURIComponent(user.email)}`)
                .then(res => res.json())
                .then(data => {
                    setDonations(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching donations:', err);
                    setLoading(false);
                });
        }
    }, []);

    const getTotalWeight = () => {
        return donations.reduce((sum, d) => sum + d.totalWeight, 0);
    };

    const getTotalItems = () => {
        return donations.reduce((sum, d) => sum + d.items.length, 0);
    };

    return (
        <div className="container fade-in" style={{ padding: '40px 20px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ color: 'var(--primary)', marginBottom: '10px' }}>My Donations</h1>
                <p style={{ color: 'var(--text-secondary)' }}>View all your donation entries</p>
            </div>

            {/* Summary Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}>
                <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                        {donations.length}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Donations</div>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ fontSize: '2rem', color: 'var(--success)', fontWeight: 'bold' }}>
                        {getTotalWeight()} kg
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Weight</div>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ fontSize: '2rem', color: 'var(--secondary)', fontWeight: 'bold' }}>
                        {getTotalItems()}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Items</div>
                </div>
            </div>

            {/* Donations List */}
            {loading ? (
                <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
                </div>
            ) : donations.length === 0 ? (
                <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>No donations yet. Start donating to see your entries here!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {donations.map((donation, index) => (
                        <div key={index} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                                <div>
                                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>
                                        {donation.location}
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        By: {donation.donorName}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.2rem' }}>
                                        {donation.totalWeight} kg
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#aaa' }}>
                                        {new Date(donation.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Items Table */}
                            <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8f9fa' }}>
                                        <tr>
                                            <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Item</th>
                                            <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Weight (kg)</th>
                                            <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donation.items.map((item, itemIndex) => (
                                            <tr key={itemIndex} style={{ borderTop: '1px solid #eee' }}>
                                                <td style={{ padding: '10px' }}>{item.name}</td>
                                                <td style={{ padding: '10px' }}>{item.weight}</td>
                                                <td style={{ padding: '10px' }}>{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyDonations;
