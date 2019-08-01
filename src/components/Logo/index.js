import React from 'react'
import './styles.css'

export default function Logo() {
    return (
        <div className="logo__container">
            <div className="logo__element logo__circle" data-test="circle"></div>
            <div className="logo__element logo__rectangle" data-test="rectangle"></div>
            <div className="logo__element logo__circle" data-test="circle"></div>
            <div className="logo__element logo__rectangle logo__rectangle-skew" data-test="skew"></div>
        </div>
    )
}
