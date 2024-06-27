import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isErr, setIsErr] = useState(false);
    const navigate = useNavigate();

    const handleAuthentication = async () => {
        setIsErr(false);
        if (!navigator.credentials || !window.PublicKeyCredential) {
            console.error("Web Authentication API not supported");
            setIsErr(true);
            return;
        }

        try {
            const publicKey: PublicKeyCredentialCreationOptions = {
                challenge: new Uint8Array([21, 31, 103]), // This should be randomly generated for production
                rp: { name: "Example Corp" },
                user: {
                    id: new Uint8Array(16), // This should be a user-specific, consistent, and non-PII byte array in production
                    name: "user@example.com",
                    displayName: "User",
                },
                pubKeyCredParams: [{ alg: -7, type: "public-key" }],
                authenticatorSelection: {
                    authenticatorAttachment: "platform" as AuthenticatorAttachment,
                    requireResidentKey: false,
                    userVerification: "required", // Require user verification for Face ID
                },
            };

            const credential = await navigator.credentials.create({ publicKey });
            console.log("Authentication successful!", credential);
            navigate('/home');
        } catch (err) {
            console.error("Authentication error", err);
            setIsErr(true);
        }
    };

    return (
        <div>
            <h2>Login Page</h2>
            <p>Welcome to the Login page!</p>
            <button onClick={handleAuthentication}>Authenticate with Face ID</button>
            {isErr && <p style={{ color: 'red' }}>Oops, something went wrong</p>}
        </div>
    );
};

export default Login;
