import React, { useState, useEffect } from 'react';

const Dashboard = ({ onStartDonating }) => {
    const [stats, setStats] = useState([
        { label: 'Total Weight Collected', value: 'Loading...', icon: '📦', color: 'var(--primary)' },
        { label: 'Total Items', value: 'Loading...', icon: '🎁', color: 'var(--success)' },
        { label: 'Active Donors', value: 'Loading...', icon: '👥', color: 'var(--secondary)' },
    ]);
    const [recentDonations, setRecentDonations] = useState([]);

    useEffect(() => {
        fetch('/api/donations')
            .then(res => res.json())
            .then(data => {
                setStats([
                    { label: 'Total Weight Collected', value: `${data.stats.totalWeight} kg`, icon: '📦', color: 'var(--primary)' },
                    { label: 'Total Items', value: `${data.stats.totalItems}`, icon: '🎁', color: 'var(--success)' },
                    { label: 'Donations Count', value: `${data.stats.count}`, icon: '👥', color: 'var(--secondary)' },
                ]);
                setRecentDonations(data.recent.map(d => ({
                    location: d.location,
                    items: d.items.map(i => i.name).join(', '),
                    weight: `${d.totalWeight} kg`,
                    time: new Date(d.date).toLocaleDateString()
                })));
            })
            .catch(err => console.error('Error fetching stats:', err));
    }, []);

    return (
        <div className="container fade-in" style={{ padding: '40px 20px' }}>
            {/* Hero Section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '60px',
                padding: '60px 20px',
                background: 'linear-gradient(135deg, rgba(0,119,182,0.1) 0%, rgba(144,224,239,0.1) 100%)',
                borderRadius: '24px'
            }}>
                <img
                    src="/logo.png"
                    alt="Relief Hub Logo"
                    style={{
                        width: '120px',
                        height: '120px',
                        marginBottom: '30px',
                        borderRadius: '20px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        objectFit: 'cover'
                    }}
                />
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '20px'
                }}>
                    UK to Sri Lanka Relief Hub
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 30px' }}>
                    Join our mission to send essential aid to Sri Lanka. Track our progress and contribute to the cause.
                </p>
                <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 32px' }} onClick={onStartDonating}>
                    Start Donating Now
                </button>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
                marginBottom: '60px'
            }}>
                {stats.map((stat, index) => (
                    <div key={index} className="card" style={{ textAlign: 'center', padding: '30px' }}>
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '10px',
                            background: '#f0f9ff',
                            width: '80px',
                            height: '80px',
                            lineHeight: '80px',
                            borderRadius: '50%',
                            margin: '0 auto 20px'
                        }}>
                            {stat.icon}
                        </div>
                        <h3 style={{ fontSize: '2.5rem', color: stat.color, marginBottom: '5px' }}>{stat.value}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ color: 'var(--text-primary)' }}>Recent Contributions</h2>
                    <span style={{ color: 'var(--success)', fontSize: '0.9rem', fontWeight: '600' }}>● Live Updates</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {recentDonations.length > 0 ? recentDonations.map((donation, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px',
                            background: '#f8f9fa',
                            borderRadius: '12px',
                            transition: 'transform 0.2s',
                            cursor: 'default'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: '#e3f2fd',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '15px',
                                fontSize: '1.2rem'
                            }}>
                                📍
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '2px' }}>{donation.location}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{donation.items}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{donation.weight}</div>
                                <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{donation.time}</div>
                            </div>
                        </div>
                    )) : (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No recent donations yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
