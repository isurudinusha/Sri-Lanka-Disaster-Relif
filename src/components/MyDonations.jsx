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
        <div className="container fade-in spacing-mobile-reduce">
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: 'clamp(1.75rem, 4vw, 2rem)' }}>My Donations</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>View all your donation entries</p>
            </div>

            {/* Summary Cards */}
            <div className="responsive-grid responsive-grid-3" style={{ marginBottom: '30px' }}>
                <div className="card" style={{ textAlign: 'center', padding: 'clamp(1rem, 3vw, 1.25rem)' }}>
                    <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2rem)', color: 'var(--primary)', fontWeight: 'bold' }}>
                        {donations.length}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>Total Donations</div>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: 'clamp(1rem, 3vw, 1.25rem)' }}>
                    <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2rem)', color: 'var(--success)', fontWeight: 'bold' }}>
                        {getTotalWeight()} kg
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>Total Weight</div>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: 'clamp(1rem, 3vw, 1.25rem)' }}>
                    <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2rem)', color: 'var(--secondary)', fontWeight: 'bold' }}>
                        {getTotalItems()}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>Total Items</div>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {donations.map((donation, index) => (
                        <div key={index} className="card">
                            <div className="stack-mobile" style={{
                                justifyContent: 'space-between',
                                alignItems: 'start',
                                marginBottom: '15px',
                                gap: '12px'
                            }}>
                                <div style={{ flex: '1 1 auto' }}>
                                    <h3 style={{
                                        color: 'var(--text-primary)',
                                        marginBottom: '5px',
                                        fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
                                        wordBreak: 'break-word'
                                    }}>
                                        {donation.location}
                                    </h3>
                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                                        margin: 0
                                    }}>
                                        By: {donation.donorName}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div style={{
                                        fontWeight: 'bold',
                                        color: 'var(--primary)',
                                        fontSize: 'clamp(1.1rem, 3vw, 1.2rem)'
                                    }}>
                                        {donation.totalWeight} kg
                                    </div>
                                    <div style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.8rem)', color: '#aaa' }}>
                                        {new Date(donation.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Items Table */}
                            <div className="table-wrapper">
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
