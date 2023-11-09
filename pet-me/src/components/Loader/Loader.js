import React from 'react'

export default function Loader() {
    return (
        <div className='d-flex'>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <h4>Loading ...</h4>
        </div>
    )
}
