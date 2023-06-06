import React from 'react';
import './App.css';
import { useState } from 'react';

const API_URL = "https://api.github.com"

const fetchResults = async (query) => {
    try {
        const response = await fetch(`${API_URL}/search/users?q=${query}`)
        const json = await response.json()
        return json.items || []
    } catch (e) {
        throw new Error(e)
    }
}

const App = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const onSearchChange = (event) => {
        setQuery(event.target.value)
    }

    const onSearchSubmit = async (event) => {
        event.preventDefault()
        const results = await fetchResults(query)
        setResults(results)
    }

  return (
    <div>
        <h1>GitHub User Search</h1>
        <Form 
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            value={query}
        />
        {results.map((user) => (
            <User 
                key={user.login}
                avatar={user.avatar_url}
                url={user.html_url}
                username={user.login}
            />
        ))}
    </div>
  )
}

const User = ({avatar, url, username}) => {
    return (
        <div className='user'>
            <img src={avatar} alt='Profile' width='100' height='100' />
            <a href={url} target='_blank' rel='noopener noreferrer'>
                {username}
            </a>
        </div>
    )
}

const Form = ({onSubmit, onChange, value}) => {
    return (
        <form onSubmit={onSubmit}>
            <input 
                type='text'
                placeholder='Enter username'
                onChange={onChange}
                value={value}
            />
            <button type='submit'>Search</button>
        </form>
    )
}

export default App