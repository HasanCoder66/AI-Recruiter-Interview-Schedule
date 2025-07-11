import React from 'react'
import { mLogo, wave } from '../../assets'

const LoaderCmp = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                position: 'relative',
            }}
        >
            <img
                src={mLogo}
                style={{ position: 'absolute', width: '150px' }}
            />
            <img src={wave} />
        </div>
    )
}

export default LoaderCmp