'use client';

import React from 'react';

export default function StateDisplay({ numbers }: { numbers: number[] }) {
    const containerStyle: React.CSSProperties = {
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        maxWidth: '400px',
        margin: '20px auto',
        textAlign: 'center',
        fontSize: '16px',
        lineHeight: '1.5',
        color: '#333',
    };

    const itemStyle: React.CSSProperties = {
        display: 'inline-block',
        padding: '8px',
        margin: '5px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '4px',
        fontWeight: 'bold',
    };

    return (
        <div style={containerStyle}>
            {numbers.map((item, index) => (
                <span key={index} style={itemStyle}>
                    {item}
                </span>
            ))}
        </div>
    );
}