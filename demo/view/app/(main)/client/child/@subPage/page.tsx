export default () => {
    return (
        <div style={styles.container}>
            <div style={styles.content}>
                Waiting for page refreshing...
            </div>
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', 
        padding: '20px', 
    },
    content: {
        fontSize: '24px', 
        fontWeight: 'bold' as 'bold', 
        color: '#333', 
        background: 'linear-gradient(135deg, #FFEEEE, #DDEFBB)',
        padding: '20px 40px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
        textAlign: 'center' as 'center', 
    },
};