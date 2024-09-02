import { LocalType } from "@repo/local/src/base";
import getLocal from "@repo/local/src/getLocal";
import 'bootstrap/dist/css/bootstrap.min.css';

export const generateStaticParams = () => [
    {
        local: 'cn'     // Chinese
    },
    {
        local: 'en'     // English
    }
]

export const dynamicParams = false;

export default ({params}: {params: {local: LocalType}}) => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Login</h2>
                <div className="mb-3 text-center">
                    <div><strong>Runtime Env NAME:</strong> {process.env.NAME}</div>
                    <div><strong>File Env NAME:</strong> {process.env.FILE_NAME}</div>
                </div>
                <form action="/af/api/login" method="post">
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            {getLocal(params.local).password}
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button className="btn btn-primary w-100" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}