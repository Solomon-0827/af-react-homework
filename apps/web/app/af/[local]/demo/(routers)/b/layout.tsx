'use client';

import Link from "next/link"
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState, CSSProperties } from "react";
import { ThemeContext } from "../../context";

export default function MyComponent({ children, b1 }: { children: React.ReactNode, b1: React.ReactNode }) {
    const defaultPath = usePathname();
    const [baseName, setBaseName] = useState("");
    const { color } = useContext(ThemeContext);

    // Print website url when click the page
    useEffect(() => {
        const printUrl = () => console.log("Now the path is: ", defaultPath);
        window.addEventListener("click", printUrl);
        return () => window.removeEventListener("click", printUrl);
    }, [defaultPath]);

    // Modify defaultPath
    useEffect(() => {
        setBaseName(defaultPath + (defaultPath.endsWith("/b") ? "/bb" : ""));
    }, [defaultPath]);

    const linkStyle: CSSProperties = {
        display: 'block',
        borderBottom: `2px solid ${color}`,
        height: '60px',
        lineHeight: '60px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        color: color,
        fontSize: '18px',
        fontWeight: 'bold',
        textDecoration: 'none',
        transition: 'background-color 0.3s, color 0.3s',
    };

    const containerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        height: '338px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '0',
    };

    const sideBarStyle: CSSProperties = {
        flex: 1,
        borderRight: `2px solid ${color}`,
        padding: '20px',
        backgroundColor: '#fafafa',
    };

    const contentStyle: CSSProperties = {
        flex: 2,
        padding: '20px',
        backgroundColor: '#ffffff',
    };

    return (
        <div>
            <Link href={baseName} style={linkStyle}>
                to bb
            </Link>
            <div style={containerStyle}>
                <div style={sideBarStyle}>{children}</div>
                <div style={contentStyle}>{b1}</div>
            </div>
        </div>
    );
}