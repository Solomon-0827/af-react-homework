'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useOptimistic, startTransition } from "react";

export default function MyComponent({ flag }: { flag: number }) {
    const path = usePathname();
    const [text, setText] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [opt, addOpt] = useOptimistic("", (state, value: string) => {
        return value;
    });

    useEffect(() => {
        if (flag > 0)  inputRef.current?.focus();
    }, [flag]);

    const submit = async (fd: FormData) => {
        startTransition(async () => {
            try { 
                addOpt("提交完了") 
                await fetch("/af/api/opt");
            }
            catch (e) {
                console.log(e);
            };
        });
    };

    useEffect(() => {
        if (text === "999") {
            throw new Error(text);
        }
    }, [text]);

    const containerStyle: React.CSSProperties = {
        maxWidth: '300px', // 缩小最大宽度
        margin: '15px auto', // 缩小外边距
        padding: '15px', // 缩小内边距
        borderRadius: '6px', // 缩小圆角
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // 轻微缩小阴影
        backgroundColor: '#ffffff',
        textAlign: 'center',
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '8px', // 缩小内边距
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '14px', // 缩小字体大小
        marginBottom: '12px', // 缩小底部外边距
        boxSizing: 'border-box',
    };

    const buttonStyle: React.CSSProperties = {
        padding: '8px 16px', // 缩小按钮的内边距
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '14px', // 缩小字体大小
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
    };

    const linkStyle: React.CSSProperties = {
        display: 'inline-block',
        margin: '12px 0', // 缩小外边距
        fontSize: '14px', // 缩小字体大小
        color: '#007bff',
        textDecoration: 'none',
        cursor: 'pointer',
    };

    return (
        <div style={containerStyle}>
            <p>{opt}</p>
            <input
                type="text"
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={inputStyle}
                placeholder="Enter text"
            /><br />
            <Link href={`${path}/${text}`} style={linkStyle}>
                Go to c/id
            </Link><br />
            <form onSubmit={(e) => { e.preventDefault(); submit(new FormData(e.currentTarget)); }}>
                <button type="submit" style={buttonStyle}>
                    Submit
                </button>
            </form>
        </div>
    );
}