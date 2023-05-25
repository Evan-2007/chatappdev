'use client'
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import style from './input.module.css';

const Input = () => {
  const [inputValue, setInputValue] = useState('');
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  const userImage = session?.user?.image;
  const URL = '/api/messages';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue) {
      console.error('Input value is required.');
      return;
    }

    // Generate a UUID for the message
    const messageId = uuidv4();

    // Call the API endpoint to insert the data into MongoDB
    const result = await axios.post(URL, {
      id: messageId,
      input: inputValue,
      userImage: userImage,
      userName: userName,
      timestamp: new Date().toISOString()
    });

    console.log(`Inserted ${result.data.insertedCount} document(s)`);
    setInputValue('');
  }

  return (
    <div>
      <div className={style.signout}>
        <button onClick={() => signOut()} className={style.button}>Sign out</button>
        </div>
    <div className={`${style.content} ${style.darkTheme}`}>
        <div className={style.input}>

          <form onSubmit={handleSubmit} className={style.form}>
            <input
              className={style.formInput}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type Your Message Here"
            />
            <button type="submit" className={style.submit}>Submit</button>
            
          </form>
        {/*<div className={style.pfp}>
        </div>*/}
      </div>
    </div>
    </div>
  );
}
 
export default Input;
