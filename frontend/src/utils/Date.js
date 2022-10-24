import React from 'react';

const Date = ({ date }) => {
  const monthNames = new Map([
    ['01', 'January'],
    ['02', 'February'],
    ['03', 'March'],
    ['04', 'April'],
    ['05', 'May'],
    ['06', 'June'],
    ['07', 'July'],
    ['08', 'August'],
    ['09', 'September'],
    ['10', 'October'],
    ['11', 'November'],
    ['12', 'December'],
  ]);

  const d = date.substring(8, 10);
  const m = monthNames.get(date.substring(5, 7));
  const y = date.substring(0, 4);
  return (
    <span>
      {d}, {m}, {y}
    </span>
  );
};

export default Date;
