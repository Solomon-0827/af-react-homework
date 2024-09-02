'use client';

import { usePathname } from "next/navigation";
import { useFetchData } from "@repo/fetch-data/src/fetch";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSProperties, Fragment, useEffect, useState } from "react";
import Image from "next/image";

export default () => {
    const pathName = usePathname();
    const listPath = pathName.split('/cn')[0];
    const elementList = useFetchData(listPath + '/api/getList');
    const [showOverlay, setShowOverlay] = useState(false);

    // Print client environment parameter
    useEffect(() => console.log("Here is a client environment variable: ", process.env.NEXT_PUBLIC_DEFAULT_NAME));
    

    const handleClick = (id: number) => {
        if (id % 2 === 0) {
            // Show mask
            setShowOverlay(true);

            // Change URL
            const pathSegments = pathName.split("/");
            window.history.replaceState(null, '', `/${pathSegments[1]}/${pathSegments[2]}`);
        }
    };

    const handleClose = () => {
        // Hide mask
        setShowOverlay(false);

        // Reback URL
        window.history.replaceState(null, '', '/af/cn/demo/a');
    };

    const fullscreenDivStyle: CSSProperties = {
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const imageContainerStyle: CSSProperties = {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    };

    const imageStyle: CSSProperties = {
        marginBottom: "20px",
    };

    const buttonStyle: CSSProperties = {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s",
    };

    return (
        <Fragment>
            {showOverlay && (
                <div style={fullscreenDivStyle}>
                    <div style={imageContainerStyle}>
                        <Image src={"/next.svg"} alt="aka" width={200} height={200} style={imageStyle} />
                        <button
                            style={buttonStyle}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                            onClick={handleClose}
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}
            <div className="container mt-4" style={{ maxWidth: '600px' }}>
                <ul className="list-group">
                    {elementList.map((item: { id: number }) => (
                        <li
                            key={item.id}
                            className="list-group-item p-2"
                            style={{ paddingLeft: '15px', cursor: 'pointer' }}
                            onClick={() => handleClick(item.id)}
                        >
                            <div
                                className="d-flex align-items-center"
                                style={{
                                    color: item.id % 2 === 0 ? '#007bff' : '#6c757d',
                                    textDecoration: 'none',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a3d7ff')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                                {`${item.id}`}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
}