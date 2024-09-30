'use client';

import { useGeolocated } from "react-geolocated";
import { fetchUserInfo } from "../list/action";
import { insertTheme } from "./action";
import SuccessDialog from "@/app/components/sucess-dialog";
import { useUserContext } from "@/app/components/themeContext";
import { useState } from "react";

export default () => {
    const [themeInput, setThemeInput] = useState("");
    const [userTheme, setUserTheme] = useState({});
    const { coords } = useGeolocated();
    const { setBackground } = useUserContext();

    const createTheme = async (formdata: FormData) => {
        const token = localStorage.getItem('token') || '';
        const userInfo = await fetchUserInfo(token);
        const theme = formdata.get('theme')?.toString() || '';
        const userTheme = await insertTheme(userInfo.id, theme, [coords?.latitude || 0, coords?.longitude || 0]);
        if (userTheme) {
            setUserTheme(userTheme);
            (window as any).openSuccessDialog();
        }
    }

    const changeTheme = () => setBackground(userTheme.theme);

    const isButtonDisabled = !themeInput.trim();

    return (
        <>
            <SuccessDialog title={"Customized Theme Created"} message={"We will change the color of banner soon."} onConfirm={changeTheme} >
                <div>
                    Your Banner theme will be changed into <span style={{ color: userTheme.theme, fontWeight: "bolder", fontSize: '20px', }}>{userTheme.theme}.</span>
                </div>
            </SuccessDialog>
            <form action={createTheme} style={styles.form}>
                <h1 style={styles.title}>Register A Theme!</h1>
                <input
                    type="text"
                    placeholder="Enter theme name"
                    style={styles.input}
                    id="theme"
                    name="theme"
                    onChange={(e) => setThemeInput(e.target.value)}
                />
                <button
                    type="submit"
                    style={isButtonDisabled ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
                    disabled={isButtonDisabled}
                >
                    确认
                </button>
            </form>
        </>
    );
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        width: '100%',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold' as 'bold',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center' as 'center',
    },
    input: {
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        boxSizing: 'border-box' as 'border-box',
    },
    button: {
        padding: '12px',
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold' as 'bold',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#45a049',
    },
    buttonDisabled: {
        backgroundColor: '#cccccc', 
        cursor: 'not-allowed', 
        color: '#666', 
    },
}