import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useFlags} from 'launchdarkly-react-client-sdk';

function App() {
    const {devTestFlag} = useFlags();

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>Flag value: {devTestFlag?.toString()}</p>
            </header>
        </div>
    );
}

export default App;
