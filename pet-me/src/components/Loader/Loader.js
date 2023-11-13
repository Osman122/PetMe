import React from 'react'

export default function Loader() {
    return (
        <div className='d-flex h-100 w-100' style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h4>Loading ...</h4>
        </div>
    )
}
