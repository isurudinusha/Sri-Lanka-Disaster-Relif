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
        <div className="container fade-in spacing-mobile-reduce">
            {/* Hero Section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '40px',
                padding: '40px 20px',
                background: 'linear-gradient(135deg, rgba(0,119,182,0.1) 0%, rgba(144,224,239,0.1) 100%)',
                borderRadius: '20px'
            }}>
                <img
                    src="/logo.png"
                    alt="Relief Hub Logo"
                    style={{
                        width: 'min(120px, 25vw)',
                        height: 'min(120px, 25vw)',
                        marginBottom: '20px',
                        borderRadius: '20px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        objectFit: 'cover'
                    }}
                />
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '15px',
                    lineHeight: '1.2'
                }}>
                    UK to Sri Lanka Relief Hub
                </h1>
                <p style={{
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto 25px',
                    lineHeight: '1.6'
                }}>
                    Join our mission to send essential aid to Sri Lanka. Track our progress and contribute to the cause.
                </p>
                <button
                    className="btn btn-primary btn-mobile-full"
                    style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', padding: '16px 32px' }}
                    onClick={onStartDonating}
                >
                    Start Donating Now
                </button>
            </div>

            {/* Stats Card */}
            <div className="card" style={{ marginBottom: '40px', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(1rem, 2.5vw, 1.5rem)',
                }}>
                    {stats.map((stat, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(1rem, 2.5vw, 1.5rem)',
                            padding: 'clamp(0.875rem, 2vw, 1.25rem)',
                            background: 'linear-gradient(135deg, rgba(0,119,182,0.05) 0%, rgba(144,224,239,0.05) 100%)',
                            borderRadius: '12px',
                            transition: 'transform 0.2s',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{
                                fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                                background: '#f0f9ff',
                                width: 'clamp(50px, 12vw, 60px)',
                                height: 'clamp(50px, 12vw, 60px)',
                                lineHeight: 'clamp(50px, 12vw, 60px)',
                                borderRadius: '12px',
                                textAlign: 'center',
                                flexShrink: 0
                            }}>
                                {stat.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                                    color: 'var(--text-secondary)',
                                    fontWeight: '500',
                                    marginBottom: '4px'
                                }}>{stat.label}</div>
                                <div style={{
                                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                                    color: stat.color,
                                    fontWeight: '700',
                                    wordBreak: 'break-word'
                                }}>{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
                <div className="stack-mobile" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}>Recent Contributions</h2>
                    <span style={{ color: 'var(--success)', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', fontWeight: '600' }}>● Live Updates</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {recentDonations.length > 0 ? recentDonations.map((donation, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            padding: 'clamp(12px, 2vw, 15px)',
                            background: '#f8f9fa',
                            borderRadius: '12px',
                            gap: '12px',
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
                                fontSize: '1.2rem',
                                flexShrink: 0
                            }}>
                                📍
                            </div>
                            <div style={{ flex: '1 1 200px', minWidth: '0' }}>
                                <h4 style={{
                                    color: 'var(--text-primary)',
                                    marginBottom: '2px',
                                    fontSize: 'clamp(0.95rem, 2.5vw, 1rem)',
                                    wordBreak: 'break-word'
                                }}>{donation.location}</h4>
                                <p style={{
                                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                                    color: 'var(--text-secondary)',
                                    wordBreak: 'break-word',
                                    margin: 0
                                }}>{donation.items}</p>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{
                                    fontWeight: 'bold',
                                    color: 'var(--primary)',
                                    fontSize: 'clamp(0.95rem, 2.5vw, 1rem)'
                                }}>{donation.weight}</div>
                                <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', color: '#aaa' }}>{donation.time}</div>
                            </div>
                        </div>
                    )) : (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px 0' }}>No recent donations yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
