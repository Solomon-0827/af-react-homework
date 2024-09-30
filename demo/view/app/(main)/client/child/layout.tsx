import { ReactNode } from "react";

export default ({ children, subPage }: { children: ReactNode, subPage: ReactNode }) => (
    <div style={styles.container}>
        <div style={styles.leftSection}>
            {children}
        </div>
        <div style={styles.rightSection}>
            {subPage}
        </div>
    </div>
);

const styles = {
    container: {
        display: 'flex',
        height: '100%', 
        width: '100%', 
    },
    leftSection: {
        flex: '1', 
        padding: '20px',
        height: '100%', 
    },
    rightSection: {
        flex: '1', 
        padding: '20px',
        height: '100%', 
    },
};