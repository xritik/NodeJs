import React, { useEffect, useState } from 'react';

const Dashboard = ({ navigate, setSignupMessage, loginUser, logout }) => {
    const [fullname, setFullname] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/dashboard', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'login-user': loginUser, // Include user ID in headers
                    },
                    credentials: 'include', // Include session cookies if used
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setFullname(data.fullname); // Set fullname if the request succeeds
                    setSignupMessage(data.message);
                } else {
                    setSignupMessage('User not logged in');
                    navigate('/login'); // Redirect to login if the user is not authenticated
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setSignupMessage('An error occurred, Please try again');
                navigate('/login'); // Redirect to login on error
            }
        };
    
        fetchUserData();
    }, [navigate, setSignupMessage, loginUser]); // Include all dependencies in the dependency array    

    return (
        <div>
            <nav>
                <div className='welcomeuser' style={{width: '5%', fontSize: '35px'}}>R.</div>
                <div className='welcomeuser' style={{width: '85%'}}>
                    Welcome&nbsp;<i>{fullname}</i>!
                </div>
                <div className='part2'>
                    <button className='submitbutton logoutbutton' onClick={logout}>
                        Logout
                    </button>
                </div>
            </nav>
            <div className='dashboard-section'>
                <div></div>
            </div>
        </div>
    );
};

export default Dashboard;
