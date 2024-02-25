import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a new context
const UserContext = createContext({
    user: {},
    userID: '',
    changeUser: () => { }
});

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userID, setUserID] = useState('');

    const changeUser = (newUser) => {
        setUser(newUser)
    }

    useEffect(() => {
        setUserID(user._id)
    }, [user]);

    return (
        <UserContext.Provider value={{ user, userID, changeUser }}>
            {children}
        </UserContext.Provider>
    )
}

// Export UserContextProvider
export default UserContextProvider;

// Create a custom hook to use the context
export const useUserContext = () => {
    return useContext(UserContext);
}
