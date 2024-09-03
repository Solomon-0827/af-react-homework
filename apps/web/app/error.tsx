'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ExclamationTriangleFill } from 'react-bootstrap-icons'; // 引入图标

export default ({ error, reset }: { error: Error, reset: () => void }) => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center p-5 rounded shadow" style={{ backgroundColor: '#ffffff' }}>
                <ExclamationTriangleFill className="text-warning mb-4" size={60} />
                <h1 className="display-4 text-danger mb-3">Error</h1>
                <p className="lead mb-4">Sorry, something went wrong.</p>
                <p className="text-muted mb-4">{error.message}</p>
                <a href="/af" className="btn btn-primary btn-lg px-5">Go to Homepage</a>
            </div>
        </div>
    );
}