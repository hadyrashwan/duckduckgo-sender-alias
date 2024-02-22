import { useState } from 'react';
import duckduckgoLogo from './assets/duckduckgo_logo.svg';
import './App.css';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [showGeneratedEmail, setShowGeneratedEmail] = useState(false);

  const handleClick = () => {
    if (input1.includes('@') && input2.includes('@')) {
      setShowGeneratedEmail(true);
    } else {
      setShowGeneratedEmail(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={duckduckgoLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Recipient email</h1>
      <div className="card">
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="your @duck.com email"
        />
        <br />
        <br />

        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="sender email"
        />
        <br />

        <br />

        <button onClick={handleClick}>Generate Alias</button>

        {showGeneratedEmail && (
          <p>
            Send email to {input2} by sending to the email below:
            <br />
            {`${input2.replace('@', '_at_')}_${input1}`}
          </p>
        )}
      </div>
      <div className="tool-description">
        <p>This tool helps you send emails using your DuckDuckGo email.</p>
      </div>
    </>
  );
}

export default App;
