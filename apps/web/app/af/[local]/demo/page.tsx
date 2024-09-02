import 'bootstrap/dist/css/bootstrap.min.css';

export default function DemoPage() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center p-4 bg-white rounded shadow">
                <h1 className="display-4 text-primary mb-3">Welcome to the Demo Page</h1>
                <p className="lead text-secondary">
                    This is a simple demo page, Enjoy it!
                </p>
                <a href="/" className="btn btn-primary mt-3">Go to Homepage</a>
            </div>
        </div>
    );
}