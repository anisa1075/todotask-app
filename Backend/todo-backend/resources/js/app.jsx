import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';

const App = () => {
  return (
    <p className="text-red-500 text-3xl bg-yellow-300">hai</p>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
