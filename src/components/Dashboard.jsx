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
            padding: 'clamp(16px, 3vw, 40px)',
            paddingBottom: 'clamp(32px, 5vw, 60px)'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Header Section */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: 'clamp(24px, 4vw, 40px)',
                    padding: 'clamp(24px, 4vw, 40px) clamp(16px, 3vw, 20px)'
                }}>
                    <img
                        src="/logo.png"
                        alt="Relief Hub"
                        style={{
                            width: 'clamp(80px, 15vw, 120px)',
                            height: 'clamp(80px, 15vw, 120px)',
                            marginBottom: '16px',
                            borderRadius: '16px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            objectFit: 'cover'
                        }}
                    />
                    <h1 style={{
                        fontSize: 'clamp(24px, 4vw, 42px)',
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
                        fontSize: 'clamp(14px, 2vw, 18px)',
                        color: '#64748b',
                        marginBottom: '20px',
                        lineHeight: '1.5',
                        maxWidth: '600px',
                        margin: '0 auto 20px'
                    }}>
                        Join our mission to send essential aid to Sri Lanka
                    </p>
                    <button
                        onClick={onStartDonating}
                        style={{
                            width: 'clamp(200px, 100%, 400px)',
                            padding: '16px clamp(24px, 4vw, 32px)',
                            fontSize: 'clamp(15px, 2vw, 17px)',
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
                    padding: 'clamp(20px, 3vw, 32px)',
                    marginBottom: 'clamp(20px, 3vw, 32px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                    <h2 style={{
                        fontSize: 'clamp(16px, 2.5vw, 20px)',
                        fontWeight: '700',
                        color: '#1e293b',
                        marginBottom: 'clamp(16px, 3vw, 24px)',
                        textAlign: 'center'
                    }}>
                        Our Impact
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 'clamp(12px, 2vw, 16px)'
                    }}>
                        {/* Weight */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: 'clamp(16px, 2.5vw, 20px)',
                            background: 'linear-gradient(135deg, rgba(0,119,182,0.05), rgba(0,180,216,0.05))',
                            borderRadius: '12px'
                        }}>
                            <div style={{
                                fontSize: 'clamp(28px, 5vw, 36px)',
                                width: 'clamp(56px, 10vw, 64px)',
                                height: 'clamp(56px, 10vw, 64px)',
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
                                    fontSize: 'clamp(12px, 1.8vw, 14px)',
                                    color: '#64748b',
                                    fontWeight: '500',
                                    marginBottom: '2px'
                                }}>
                                    Total Weight Collected
                                </div>
                                <div style={{
                                    fontSize: 'clamp(24px, 4vw, 32px)',
                                    fontWeight: '800',
                                    color: '#0077b6',
                                    lineHeight: '1'
                                }}>
                                    {stats.totalWeight} <span style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: '600' }}>kg</span>
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: 'clamp(16px, 2.5vw, 20px)',
                            background: 'linear-gradient(135deg, rgba(34,197,94,0.05), rgba(74,222,128,0.05))',
                            borderRadius: '12px'
                        }}>
                            <div style={{
                                fontSize: 'clamp(28px, 5vw, 36px)',
                                width: 'clamp(56px, 10vw, 64px)',
                                height: 'clamp(56px, 10vw, 64px)',
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
                                    fontSize: 'clamp(12px, 1.8vw, 14px)',
                                    color: '#64748b',
                                    fontWeight: '500',
                                    marginBottom: '2px'
                                }}>
                                    Total Items
                                </div>
                                <div style={{
                                    fontSize: 'clamp(24px, 4vw, 32px)',
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
                            padding: 'clamp(16px, 2.5vw, 20px)',
                            background: 'linear-gradient(135deg, rgba(144,224,239,0.08), rgba(144,224,239,0.08))',
                            borderRadius: '12px'
                        }}>
                            <div style={{
                                fontSize: 'clamp(28px, 5vw, 36px)',
                                width: 'clamp(56px, 10vw, 64px)',
                                height: 'clamp(56px, 10vw, 64px)',
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
                                    fontSize: 'clamp(12px, 1.8vw, 14px)',
                                    color: '#64748b',
                                    fontWeight: '500',
                                    marginBottom: '2px'
                                }}>
                                    Donations Count
                                </div>
                                <div style={{
                                    fontSize: 'clamp(24px, 4vw, 32px)',
                                    fontWeight: '800',
                                    color: '#0ea5e9',
                                    lineHeight: '1'
                                }}>
                                    {stats.donationsCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Donations */}
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: 'clamp(20px, 3vw, 32px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'clamp(16px, 2.5vw, 24px)'
                    }}>
                        <h2 style={{
                            fontSize: 'clamp(16px, 2.5vw, 20px)',
                            fontWeight: '700',
                            color: '#1e293b',
                            margin: 0
                        }}>
                            Recent Contributions
                        </h2>
                        <span style={{
                            fontSize: 'clamp(11px, 1.8vw, 13px)',
                            color: '#22c55e',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <span style={{ fontSize: '8px' }}>●</span> Live
                        </span>
                    </div>

                    <div style={{
                        display: 'grid',
                        gap: 'clamp(12px, 2vw, 16px)',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
                    }}>
                        {recentDonations.length > 0 ? recentDonations.map((donation, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: 'clamp(12px, 2vw, 16px)',
                                background: '#f8fafc',
                                borderRadius: '12px',
                                border: '1px solid #f1f5f9'
                            }}>
                                <div style={{
                                    width: 'clamp(40px, 8vw, 48px)',
                                    height: 'clamp(40px, 8vw, 48px)',
                                    background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 'clamp(18px, 3vw, 22px)',
                                    flexShrink: 0
                                }}>
                                    📍
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: 'clamp(13px, 2vw, 15px)',
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
                                        fontSize: 'clamp(11px, 1.8vw, 13px)',
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
                                        fontSize: 'clamp(13px, 2vw, 15px)',
                                        fontWeight: '700',
                                        color: '#0077b6'
                                    }}>
                                        {donation.weight} kg
                                    </div>
                                    <div style={{
                                        fontSize: 'clamp(10px, 1.5vw, 12px)',
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
                                fontSize: 'clamp(13px, 2vw, 15px)',
                                padding: '20px 0',
                                margin: 0,
                                gridColumn: '1 / -1'
                            }}>
                                No recent donations yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
