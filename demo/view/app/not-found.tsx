'use client';

import { useRouter } from 'next/navigation';

const Custom404 = () => {
    const router = useRouter();

    // 返回首页的处理函数
    const goToHome = () => {
        router.push('/'); // 跳转到首页
    };

    return (
        <html>
            <body>
                <div style={styles.container}>
                    <div style={styles.errorBox}>
                        <h1 style={styles.title}>404</h1>
                        <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
                        <button 
                            style={styles.button} 
                            onClick={goToHome}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#357ABD'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                        >
                            Go Back Home
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8',
        textAlign: 'center' as 'center',
    },
    errorBox: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '96px',
        margin: '0',
        fontWeight: 'bold' as 'bold',
        color: '#333',
    },
    message: {
        fontSize: '18px',
        color: '#555',
        margin: '20px 0',
    },
    button: {
        backgroundColor: '#4a90e2',
        color: '#fff',
        padding: '12px 24px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    }
};

export default Custom404;