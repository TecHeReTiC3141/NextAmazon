"use client"

import {useEffect, useState} from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('event added');
        document.querySelector("#incr")?.addEventListener("click", () => {
            console.log("button clicked");
            setCount(prevCount => prevCount + 1);
        })
    }, []);
    return (
        <>
            <h2>{count}</h2>
            <button id="incr" onClick={() => {
                console.log("button clicked");
                setCount(prevCount => prevCount + 1);
            }}>Increment</button>
        </>
    )
}