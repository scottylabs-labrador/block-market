import React, { useState } from 'react';
import { FormEvent } from "react";
import { useRouter } from "next/router";


const Home = () => {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const router = useRouter()


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const names = {
      firstName: firstName,
      lastName: lastName,
    };
    
    // Send data to backend API
    const response = await fetch('http://localhost:8000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(names),
    });

    // Handle the response from the backend as needed
    const data = await response.json();
    console.log(data);

    router.push("/market")

  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
        First name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        form {
          text-align: center;
        }
        label {
          display: block;
          margin-bottom: 10px;
        }
        input {
          margin-left: 5px;
        }
      `}</style>
    </div>
  );
};

export default Home;