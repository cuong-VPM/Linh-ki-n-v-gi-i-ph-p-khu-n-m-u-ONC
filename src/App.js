import React from 'react';

export default function App() {
  return (
    <div style={{fontFamily: 'Arial', padding: 20}}>
      <h1>Tra cứu Ejector Pins</h1>
      <p>Web tra cứu kích thước EPN / EPJ</p>

      <table border="1" cellPadding="10" style={{borderCollapse:'collapse'}}>
        <thead>
          <tr>
            <th>Type</th>
            <th>P</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>EPN</td><td>3</td><td>100</td></tr>
          <tr><td>EPN</td><td>3</td><td>150</td></tr>
          <tr><td>EPJ</td><td>8</td><td>600</td></tr>
        </tbody>
      </table>

      <p style={{marginTop:20}}>Bạn có thể nâng cấp thêm dữ liệu sau.</p>
    </div>
  );
}
