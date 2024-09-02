'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { ExclamationTriangleFill } from 'react-bootstrap-icons'; // 引入图标

export default () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center">
                <ExclamationTriangleFill className="text-warning mb-4" size={60} />
                <h1 className="display-4 text-danger mb-3">404 - Page Not Found</h1>
                <p className="lead mb-4">
                    Oops! The page you are looking for does not exist.
                </p>
                <Link href={"/af"} className="btn btn-primary btn-lg">
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
}