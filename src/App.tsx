import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const handleAuthentication = async () => {
    if (!navigator.credentials) {
        console.error("Web Authentication API not supported");
        return;
    }

    try {
        const publicKey: PublicKeyCredentialCreationOptions = {
            challenge: new Uint8Array([21, 31, 103]),  // This should be randomly generated for production
            rp: { name: "Example Corp" },
            user: {
                id: new Uint8Array(16),  // This should be a user-specific, consistent, and non-PII byte array in production
                name: "user@example.com",
                displayName: "User",
            },
            pubKeyCredParams: [{ alg: -7, type: "public-key" }],
            authenticatorSelection: {
                authenticatorAttachment: "platform" as AuthenticatorAttachment
            },
        };

        const credential = await navigator.credentials.create({ publicKey });
        console.log("Authentication successful!", credential);
    } catch (err) {
        console.error("Authentication error", err);
    }
};

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <button onClick={handleAuthentication}>Authenticate with Fingerprint</button>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
