import React, { useState, useEffect } from 'react';

const Dashboard = ({ onStartDonating }) => {
    const [stats, setStats] = useState({
        totalWeight: 'Loading...',
        totalItems: 'Loading...',
        donationsCount: 'Loading...'
    });
    const [recentDonations, setRecentDonations] = useState([]);

    useEffect(() => {
        fetch('/api/donations')
            .then(res => res.json())
            .then(data => {
                setStats({
                    totalWeight: data.stats.totalWeight,
                    totalItems: data.stats.totalItems,
                    donationsCount: data.stats.count
                });
                setRecentDonations(data.recent.map(d => ({
                    location: d.location,
                    items: d.items.map(i => i.name).join(', '),
                    weight: d.totalWeight,
                    time: new Date(d.date).toLocaleDateString()
                })));
            })
            .catch(err => console.error('Error fetching stats:', err));
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #f0f9ff 0%, #ffffff 100%)',
            padding: '16px',
            paddingBottom: '32px'
        }}>
            {/* Header Section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '24px',
                padding: '24px 16px'
            }}>
                <img
                    src="/logo.png"
                    alt="Relief Hub"
                    style={{
                        width: '80px',
                        height: '80px',
                        marginBottom: '16px',
                        borderRadius: '16px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        objectFit: 'cover'
                    }}
                />
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #0077b6, #90e0ef)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '8px',
                    lineHeight: '1.2'
                }}>
                    UK to Sri Lanka Relief Hub
                </h1>
                <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    marginBottom: '20px',
                    lineHeight: '1.5'
                }}>
                    Join our mission to send essential aid to Sri Lanka
                </p>
                <button
                    onClick={onStartDonating}
                    style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'white',
                        background: 'linear-gradient(135deg, #0077b6, #00b4d8)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,119,182,0.3)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, boxShadow 0.2s'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Start Donating Now
                </button>
            </div>

            {/* Stats Card */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
                <h2 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '16px',
                    textAlign: 'center'
                }}>
                    Our Impact
                </h2>

                {/* Weight */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: 'linear-gradient(135deg, rgba(0,119,182,0.05), rgba(0,180,216,0.05))',
                    borderRadius: '12px',
                    marginBottom: '12px'
                }}>
                    <div style={{
                        fontSize: '32px',
                        width: '56px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#e0f2fe',
                        borderRadius: '12px',
                        flexShrink: 0
                    }}>
                        📦
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '12px',
                            color: '#64748b',
                            fontWeight: '500',
                            marginBottom: '2px'
                        }}>
                            Total Weight Collected
                        </div>
                        <div style={{
                            fontSize: '28px',
                            fontWeight: '800',
                            color: '#0077b6',
                            lineHeight: '1'
                        }}>
                            {stats.totalWeight} <span style={{ fontSize: '18px', fontWeight: '600' }}>kg</span>
                        </div>
                    </div>
                </div>

                {/* Items */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: 'linear-gradient(135deg, rgba(34,197,94,0.05), rgba(74,222,128,0.05))',
                    borderRadius: '12px',
                    marginBottom: '12px'
                }}>
                    <div style={{
                        fontSize: '32px',
                        width: '56px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#dcfce7',
                        borderRadius: '12px',
                        flexShrink: 0
                    }}>
                        🎁
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '12px',
                            color: '#64748b',
                            fontWeight: '500',
                            marginBottom: '2px'
                        }}>
                            Total Items
                        </div>
                        <div style={{
                            fontSize: '28px',
                            fontWeight: '800',
                            color: '#22c55e',
                            lineHeight: '1'
                        }}>
                            {stats.totalItems}
                        </div>
                    </div>
                </div>

                {/* Donations Count */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: 'linear-gradient(135deg, rgba(144,224,239,0.08), rgba(144,224,239,0.08))',
                    borderRadius: '12px'
                }}>
                    <div style={{
                        fontSize: '32px',
                        width: '56px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f0f9ff',
                        borderRadius: '12px',
                        flexShrink: 0
                    }}>
                        👥
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '12px',
                            color: '#64748b',
                            fontWeight: '500',
                            marginBottom: '2px'
                        }}>
                            Donations Count
                        </div>
                        <div style={{
                            fontSize: '28px',
                            fontWeight: '800',
                            color: '#0ea5e9',
                            lineHeight: '1'
                        }}>
                            {stats.donationsCount}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Donations */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h2 style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1e293b',
                        margin: 0
                    }}>
                        Recent Contributions
                    </h2>
                    <span style={{
                        fontSize: '12px',
                        color: '#22c55e',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <span style={{ fontSize: '8px' }}>●</span> Live
                    </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {recentDonations.length > 0 ? recentDonations.map((donation, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            background: '#f8fafc',
                            borderRadius: '12px',
                            border: '1px solid #f1f5f9'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                flexShrink: 0
                            }}>
                                📍
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#1e293b',
                                    marginBottom: '2px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {donation.location}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#64748b',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {donation.items}
                                </div>
                            </div>
                            <div style={{
                                textAlign: 'right',
                                flexShrink: 0
                            }}>
                                <div style={{
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    color: '#0077b6'
                                }}>
                                    {donation.weight} kg
                                </div>
                                <div style={{
                                    fontSize: '11px',
                                    color: '#94a3b8'
                                }}>
                                    {donation.time}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p style={{
                            textAlign: 'center',
                            color: '#94a3b8',
                            fontSize: '14px',
                            padding: '20px 0',
                            margin: 0
                        }}>
                            No recent donations yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
