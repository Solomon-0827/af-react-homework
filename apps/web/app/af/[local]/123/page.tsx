import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ExclamationCircleFill } from 'react-bootstrap-icons'; // 使用 react-bootstrap-icons 插件来引入图标

export default () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center">
                <ExclamationCircleFill className="text-danger mb-3" size={50} />
                <h1 className="text-danger mb-3">Incorrect Password</h1>
                <p className="lead mb-4">The password you entered is incorrect. Please try again.</p>
                <Link href="/af" className="btn btn-primary">Back to Main Page</Link>
            </div>
        </div>
    );
}