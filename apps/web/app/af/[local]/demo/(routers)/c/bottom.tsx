'use client';

import React from 'react';

export default function ControlPanel({ addNumber, focusInput }: { addNumber: Function, focusInput: Function }) {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px', // 增大按钮之间的间距
        padding: '12px', // 增加容器的内边距
        backgroundColor: '#ffffff',
        borderRadius: '6px', // 增大圆角
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 增大阴影
        maxWidth: '250px', // 增大容器的最大宽度
        marginTop: "20px",
        marginLeft: "400px", // 使用auto使其居中
    };

    const buttonStyle: React.CSSProperties = {
        padding: '8px 16px', // 增大按钮的内边距
        borderRadius: '4px', // 增大按钮的圆角
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '14px', // 增大字体大小
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
    };

    const buttonHoverStyle: React.CSSProperties = {
        backgroundColor: '#0056b3',
        transform: 'scale(1.05)',
    };

    return (
        <div style={containerStyle}>
            <button
                onClick={() => focusInput()}
                style={buttonStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                onMouseDown={(e) => e.currentTarget.style.transform = buttonHoverStyle.transform}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                Focus!
            </button>
            <button
                onClick={() => addNumber(Math.floor(Math.random() * 10))}
                style={buttonStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                onMouseDown={(e) => e.currentTarget.style.transform = buttonHoverStyle.transform}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                Nums!
            </button>
        </div>
    );
}