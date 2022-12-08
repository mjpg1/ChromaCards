import React, { useState, useEffect } from 'react';
import CardsContainer from './components/CardsContainer.jsx';
import Login from './components/Login.jsx';
import axios from 'axios';

const colors = [
  ['absinthe', '#E0E046'], ['ash', '#748484'], ['baker-miller_pink', '#EA8CAA'],
  ['bistre', '#B7784E'], ['bubblegum_pink', '#EA477D'], ['cadet_gray', '#4A5868'],
  ['cerise', '#C12967'], ['chartreuse', '#99A53F'], ['chrome_yellow', '#F4A416'],
  ['cinnabar', '#BF2B2B'], ['cochineal', '#F21700'], ['cream', '#EFD0BF'],
  ['egyptian_blue', '#2B6EBF'], ['fallow', '#DBB477'], ['gamboge', '#DB8128'],
  ['gold', '#AD9727'], ['ham_pink', '#DB6158'], ['heliotrope', '#B776DD'],
  ['honeydew', '#50994D'], ['imperial_yellow', '#EFBA0F'], ['jungle_green', '#388426'],
  ['lime_green', '#097053'], ['mahogany', '#9E5A2D'], ['mauve', '#874089'],
  ['mountbatten_pink', '#D38D96'], ['mustard', '#F4BA14'], ['neon_green', '#45DB2A'],
  ['peach_pink', '#E8604D'], ['prussian_blue', '#261E96'], ['saffron', '#D37E0D'],
  ['scarlet', '#C90E0E'], ['sea_foam', '#35E5DC'], ['shocking_pink', '#F20A5E'],
  ['taupe', '#896860'], ['tyrian_purple', '#891D2D'], ['umber', '#9B6123'],
  ['uranian_blue', '#20B4E2'], ['violet', '#9F29D6'], ['viridian', '#38968D'],
  ['xanadu', '#526856']
];

const initialColorProgress = colors.map(([color, code]) => ({ color, code, progress: 0 }));

const App = () => {
  const [loggingIn, setLoggingIn] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [colorProgress, setColorProgress] = useState(initialColorProgress);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${user.username}`);
        setColorProgress(initialColorProgress.map(colorInfo => {
          const {color, progress} = colorInfo;
          return color in data.progress ?
            {...colorInfo, progress: data.progress[color] } : colorInfo;
        }))
      } catch (err) {
        console.log(err);
      }
    }
    if (user) getUser();
  }, [user])

  const handleCancel = (e) => {
    e.preventDefault();
    setLoggingIn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      setUser(response.data);
      setLoggingIn(false);
    } catch (err) {
      console.log(err);
    }
    setUsername('');
    setPassword('');
  }

  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  return (
    <div>
      <CardsContainer colorProgress={colorProgress} />
      {loggingIn &&
        <Login
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          updatePassword={updatePassword}
          updateUsername={updateUsername}
          username={username}
          password={password}
        />}
    </div>
  );
};

export default App;