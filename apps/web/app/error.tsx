'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ExclamationTriangleFill } from 'react-bootstrap-icons'; // 引入图标

export default () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center">
                <ExclamationTriangleFill className="text-warning mb-4" size={60} />
                <h1 className="display-4 text-danger mb-3">Error</h1>
                <p className="lead mb-4">Sorry, something went wrong.</p>
                <a href="/" className="btn btn-primary btn-lg">Go to Homepage</a>
            </div>
        </div>
    );
}