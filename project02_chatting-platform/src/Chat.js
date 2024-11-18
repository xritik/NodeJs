import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import male from './imgs/male.jpg';
import female from './imgs/female.jpg';

const Chat = ({navigate}) => {
    const userToChat = localStorage.getItem('storedUserToChat');
    const loginUser = localStorage.getItem('loginUser');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [otherUserDetail, setOtherUserDetail] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/chat', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTimeout(() => {
                        setAllUsers(data.users)
                        setIsLoading(false); // Stop loading
                    }, 2000);
                } else {
                    setMessage('Something went wrong!!');
                    setTimeout(() => {
                        // navigate('/login');
                    }, 3000);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setMessage('An error occurred, Please try again');
                setTimeout(() => {
                    // navigate('/login');
                }, 3000);
            }
        };
    
        fetchUserData();
    }, [loginUser, navigate]); // Include all dependencies in the dependency array.

    useEffect(() => {
        // Ensure allUsers has data before filtering
        if (allUsers.length > 0) {
            const matchedUser = allUsers.find((user) => user.username === userToChat);
            setOtherUserDetail(matchedUser || {}); // Set an empty object if no match is found
        }
    }, [allUsers, userToChat]);
    
    console.log(otherUserDetail?.fullname); // Use optional chaining to avoid runtime errors
    


  return (
    <div>
        <nav>
            <div className='welcomeuser' style={{width: '10%', fontSize: '28px'}}>Chat.hub</div>
            <div className='welcomeuser' style={{width: '80%'}}>
            </div>
        </nav>
        <div>
            <Link to={'/dashboard'}><i className='bx bx-arrow-back' style={{fontSize: '30px', color: 'black'}}></i></Link>
            <div className='chat-section'>
                {isLoading && <p style={{marginTop: '10px', textAlign: 'center'}}>Loading...</p>}
                {!isLoading && (
                    <>
                        <div className='chat'>
                            <div className='userProfile'>
                                <span className='profilePic'>
                                    <img src={otherUserDetail.gender === 'Female' ? female : male} alt="img" />
                                </span>
                                <span style={{ fontWeight: 'bold', paddingTop: '7px' }}>
                                    {otherUserDetail?.fullname || 'Loading...'}
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default Chat