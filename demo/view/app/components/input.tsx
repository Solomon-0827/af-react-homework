import { useDeferredValue, useMemo, useState } from "react";

export const inputClient = () => {
    const [content, setContent] = useState('');
    const delayContent = useDeferredValue(content);

    const InputEle = useMemo(() => {
        return (
            <div style={styles.inputContainer}>
                <label style={styles.label}>LazyInput</label>
                <input
                    type="text"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    style={styles.input}
                    placeholder="Type here..."
                />
            </div>
        );
    }, [content]);

    return { InputEle, delayContent };
};

const styles = {
    inputContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'flex-start',
        padding: '10px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #FFEEEE, #DDEFBB)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '20px auto',
    },
    label: {
        marginBottom: '5px',
        fontSize: '16px',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        outline: 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
    },
    inputFocus: {
        borderColor: '#007BFF',
        boxShadow: '0 0 8px rgba(0, 123, 255, 0.2)',
    },
};