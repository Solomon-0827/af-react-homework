'use client';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Loading() {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '45.5vh', // 使内容垂直居中
        backgroundColor: '#f8f9fa', // Bootstrap 的浅灰色背景
        textAlign: 'center',
    };

    const textStyle: React.CSSProperties = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#007bff', // 使用 Bootstrap 的主要蓝色
    };

    return (
        <div style={containerStyle}>
            <div>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only"> </span>
                </div>
                <div style={textStyle}>Loading...</div>
            </div>
        </div>
    );
}