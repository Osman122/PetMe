import React from 'react'

export default function Loader() {
    return (
        <div className='d-flex'>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h4>Loading ...</h4>
        </div>
    )
}
