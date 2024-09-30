import { BackToClientButton, UserButton } from "../client";

export default () => {
    return (
        <div style={styles.container}>
            <div style={styles.buttonContainer}>
                <BackToClientButton />
            </div>
            <div style={styles.buttonContainer}>
                <UserButton />
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        width: '100%',
        padding: '20px',
    },
    buttonContainer: {
        width: '400px',
        background: 'linear-gradient(135deg, #FFEEEE, #DDEFBB)',
        marginBottom: '20px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
        padding: '20px',
        borderRadius: '12px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#f28a30', 
        color: '#fff', 
        padding: '12px 24px', 
        fontSize: '16px', 
        border: 'none', 
        borderRadius: '8px', 
        cursor: 'pointer', 
        transition: 'all 0.3s ease', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
    },
    buttonHover: {
        backgroundColor: '#f2a154', 
        transform: 'translate(4px, -4px)', 
    },
};