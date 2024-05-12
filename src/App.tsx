import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import * as faceapi from 'face-api.js';

import './App.css'


function App() {
  const [count, setCount] = useState(0);

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
      const loadModels = async () => {
          const MODEL_URL = '/models';
          await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
          await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
          await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
          console.log('Models loaded');
      };

      const startVideo = () => {
          navigator.mediaDevices.getUserMedia({ video: {} })
              .then(stream => {
                  if (videoRef.current) {
                      videoRef.current.srcObject = stream;
                  }
              })
              .catch(err => {
                  console.error("Failed to start video stream:", err);
              });
      };

      loadModels().then(startVideo);

      return () => {
          if (videoRef.current && videoRef.current.srcObject) {
              (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
          }
      };
  }, []);

  useEffect(() => {
      const handleVideoOnPlay = async () => {
          const displaySize = {
              width: videoRef.current!.width,
              height: videoRef.current!.height
          };
          faceapi.matchDimensions(canvasRef.current!, displaySize);
          setInterval(async () => {
              const detections = await faceapi.detectAllFaces(videoRef.current!, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
              const resizedDetections = faceapi.resizeResults(detections, displaySize);
              canvasRef.current!.getContext('2d')!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
              faceapi.draw.drawDetections(canvasRef.current!, resizedDetections);
              faceapi.draw.drawFaceLandmarks(canvasRef.current!, resizedDetections);
          }, 100);
      };

      videoRef.current!.addEventListener('play', handleVideoOnPlay);

      return () => {
          videoRef.current!.removeEventListener('play', handleVideoOnPlay);
      };
  }, []);

  return (
    <>
      <div>
      <video ref={videoRef} autoPlay={true} muted={true} height={720} width={560} style={{ display: 'block' }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: '0', left: '0' }} />
        
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
