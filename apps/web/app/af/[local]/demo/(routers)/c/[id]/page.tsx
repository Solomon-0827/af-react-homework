import 'bootstrap/dist/css/bootstrap.min.css';

export const generateStaticParams = async () => {
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ];
};

export const dynamicParams = false;

export default async function MyComponent({ params }: { params: { id: string, local: string } }) {
    await new Promise((res: (value: unknown) => void) => setTimeout(() => res(''), 3000));

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '45.5vh',
        backgroundColor: '#f8f9fa',
    };

    const cardStyle: React.CSSProperties = {
        maxWidth: '400px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle} className="card">
                <div className="card-body">
                    <h5 className="card-title">Details</h5>
                    <p className="card-text">ID: {params.id}</p>
                </div>
            </div>
        </div>
    );
}