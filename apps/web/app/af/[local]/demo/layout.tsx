'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CSSProperties, useState } from "react";
import { ThemeContext } from './context';

const getAllLinks = () => {
    const currentPath = usePathname();
    const basePath = currentPath.endsWith("/demo") ? currentPath : currentPath.split('/demo')[0] + '/demo';
    return [
        {
            name: "To A",
            path: basePath + "/a"
        },
        {
            name: "To B",
            path: basePath + "/b"
        },
        {
            name: "To C",
            path: basePath + "/c"
        },
    ]
}

export default ({ children }: { children: JSX.Element }) => {
    const [color, setColor] = useState('#007bff');
    const toggleColor = (color: string) => setColor(color);
    const subLinks = getAllLinks();

    // Banner style
    const bannerStyle: CSSProperties = {
        height: '80px',
        width: '100%',
        backgroundColor: color,
        fontSize: '30px',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    };
    
    // Tab menu style
    const menuStyle: CSSProperties = {
        float: 'left',
        width: '80px',
        height: 'calc(100vh - 80px)',
        backgroundColor: '#f8f9fa',
        padding: '10px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        borderRight: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    return <>
        <ThemeContext.Provider value={{ color, toggleColor }}>
            <div style={bannerStyle}>DEMO</div>
            <div style={menuStyle}>
                {
                    subLinks.map((subLink) => (
                        <Link key={subLink.name} href={subLink.path} style={{
                            textDecoration: 'none',
                            color: '#333',
                            display: 'block',
                            padding: '8px 10px',
                            width: '100%',
                            textAlign: 'center',
                            borderRadius: '4px',
                            transition: 'background-color 0.3s, color 0.3s',
                            fontWeight: 'bold'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#007bff';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#333';
                        }}
                        >
                            {subLink.name}
                        </Link>
                    ))
                }
            </div>

            {children}
        </ThemeContext.Provider>
    </>
}