import React from 'react'
import './styles.css'

export default function Logo() {
    return (
        <div className="logo__container">
            <div className="logo__element logo__circle"></div>
            <div className="logo__element logo__rectangle"></div>
            <div className="logo__element logo__circle"></div>
            <div className="logo__element logo__rectangle logo__rectangle-skew"></div>
        </div>
    )
}
