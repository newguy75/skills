import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [displayDate, setDisplayDate] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const formattedDate = date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });

    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    setDisplayDate(`${formattedDate} - ${weekday}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Select a Date</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText="Click to select a date"
        dateFormat="MM/dd/yyyy"
        inline // Shows a calendar UI
      />
      <h2 style={{ marginTop: '20px' }}>{displayDate}</h2>
    </div>
  );
}

export default App;


