'use client';

import { useContext, useRef, useState, CSSProperties } from "react";
import { ThemeContext } from "../../../context";

export default function StyledComponent() {
    const [inputContent, setContent] = useState("");
    const [displayStyle, setDisplayStyle] = useState<CSSProperties>({ opacity: 0, backgroundColor: "green" });
    const { toggleColor } = useContext(ThemeContext);
    const textRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value;
        setContent(color);
    };

    const isValidColor = (input: string): boolean => {
        const isColorName = (color: string) => {
            const option = new Option().style;
            option.color = color;
            return option.color !== '';
        };
    
        const isHexColor = /^#([0-9A-F]{3}){1,2}$/i.test(input);
    
        const isRgbColor = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i.test(input);
    
        return isColorName(input) || isHexColor || isRgbColor;
    }    

    const handleChangeTheme = () => {
        if (isValidColor(inputContent)) toggleColor(inputContent);
        else toggleColor("#007bff")
    };

    const handleButtonClick = () => {
        const width = textRef.current ? textRef.current.offsetWidth : 0;
        const backgroundColor = width > 50 ? 'red' : 'green';

        setDisplayStyle((prevStyle) => ({
            opacity: prevStyle.opacity === 0 ? 1 : 0,
            backgroundColor: prevStyle.opacity === 0 ? backgroundColor : '',
            transition: 'opacity 0.5s ease, background-color 0.5s ease',
        }));
    };

    const containerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
    };

    const inputStyle: CSSProperties = {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        maxWidth: '250px',
        fontSize: '14px',
        height: '40px', // 固定输入框的高度
        boxSizing: 'border-box', // 确保内边距和边框包含在高度内
    };

    const buttonContainerStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%', // 使按钮容器与输入框同宽
        maxWidth: '250px', // 与输入框保持一致的宽度
    };

    const buttonStyle: CSSProperties = {
        flex: 1, // 使每个按钮占据容器的一半宽度
        margin: '0 5px', // 添加左右间距
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s',
    };

    const spanStyle: CSSProperties = {
        padding: '8px',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        height: '40px', // 固定文本显示区域的高度
        display: 'flex', // 使用 flexbox 让文本居中
        alignItems: 'center', // 垂直居中
        justifyContent: 'center', // 水平居中
        transition: 'opacity 0.5s ease, background-color 0.5s ease',
    };

    return (
        <div style={containerStyle}>
            <input
                type="text"
                value={inputContent}
                onChange={handleInputChange}
                placeholder="Enter something here..."
                style={inputStyle}
            />
            <div style={buttonContainerStyle}>
                <button
                    onClick={handleButtonClick}
                    style={buttonStyle}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Show Text
                </button>
                <button
                    onClick={handleChangeTheme}
                    style={buttonStyle}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Show Theme
                </button>
            </div>
            <span ref={textRef} style={{ ...displayStyle, ...spanStyle }}>{inputContent}</span>
        </div>
    );
}