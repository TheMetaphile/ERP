import { WEB_SOCKET_BASE_URL } from '../Config';
import AuthContext from '../Context/AuthContext';
import { useContext } from 'react';

const socket = () => {
    const { authState } = useContext(AuthContext);

    return io(WEB_SOCKET_BASE_URL, {
        "Authorization": `Bearer ${authState?.accessToken}`,
    });
}


export default socket;
