'use client';

import Top from "./top";
import Middle from "./middle";
import Bottom from "./bottom";
import { useState } from "react";

export default () => {
    const [numbers, setNumber] = useState([1, 2]);
    const [flag, setFlag] = useState(0);

    const addNumber = (num: number) => setNumber(state => [...state, num]);

    const focusInput = () => setFlag(flag + 1);

    return (
        <div>
            <Top numbers={numbers}/>
            <Middle flag={flag}/>
            <Bottom addNumber={addNumber} focusInput={focusInput}/>  
        </div>
    )
}