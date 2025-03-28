import React, { useState } from 'react';
import Web3 from 'web3';
import './App.css';

const App = () => {
    const [ensName, setEnsName] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    // Initialize Web3
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

    const resolveENS = async () => {
        setError('');
        try {
            const resolvedAddress = await web3.eth.ens.getAddress(ensName);
            setAddress(resolvedAddress);
        } catch (err) {
            setError("Error resolving ENS name. Please check the name and try again.");
            console.error("Error resolving ENS name:", err);
        }
    };

    return (
        <div className="App">
            <h1>Blockchain-Powered DNS Security System</h1>
            <input
                type="text"
                placeholder="Enter ENS name (e.g., example.eth)"
                value={ensName}
                onChange={(e) => setEnsName(e.target.value)}
            />
            <button onClick={resolveENS}>Resolve ENS</button>
            {address && <p>Address: {address}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default App;