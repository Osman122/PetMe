import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axiosInstance is an ... ... instance of axios
import { useParams } from "react-router-dom";

function EditUserProfile() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [editedUserData, setEditedUserData] = useState({}); // State to hold edited user data

    useEffect(() => {
        const getUserData = async () => {
        try {
            const response = await axios.get(`/api/users/${id}`); // Replace with your API endpoint
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        };

        getUserData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({ ...editedUserData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.put(`/api/users/${id}`, editedUserData); // Replace with your API endpoint
        console.log('User data updated:', response.data);
        // Optionally, you can update the local userData state with the updated data
        } catch (error) {
        console.error('Error updating user data:', error);
        }
    };

    return (
        <section style={{ backgroundColor: '#eee' }}>
        <form onSubmit={handleFormSubmit}>
            {/* Render form inputs for editing user data */}
            <input type="text" name="first_name" value={editedUserData.first_name || userData.first_name} onChange={handleInputChange} />
            {/* Add more input fields for other user data properties */}
            <button type="submit">Save</button>
        </form>
        </section>
    );
}

export default EditUserProfile;
