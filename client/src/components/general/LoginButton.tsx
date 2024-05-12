import { useAuth0 } from '@auth0/auth0-react';
import styles from './LoginButton.module.scss';

export function LoginButton() {  
    const { loginWithRedirect } = useAuth0();
    return (
        <button
            className={styles.loginButton}
            onClick={() => loginWithRedirect()}
        >
        Log In
        </button>
    );
}