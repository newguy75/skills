import React, { useState } from 'react';

function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const [display, setDisplay] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    if (value) {
      const date = new Date(value);
      const formatted = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        weekday: 'long',
      });
      setDisplay(formatted);
    } else {
      setDisplay('');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>Calendar</h1>
      <input type="date" value={selectedDate} onChange={handleChange} />
      {display && <h2>{display}</h2>}
    </div>
  );
}

export default App;
