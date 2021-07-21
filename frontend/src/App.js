import React from 'react';
import UserForm from './components/UserForm';
import 'antd/dist/antd.css';
import axios from 'axios';
import { API_SERVER } from './params';

function App() {

  axios.defaults.baseURL=API_SERVER;

  return (
    <div className="App" style={{marginTop: 40}}>
      <div style={{maxWidth: '60%', margin:'auto'}}>
        <UserForm />
      </div>
    </div>
  );
}

export default App;
