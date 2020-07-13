<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    function loadRepositories() {
      api.get('repositories').then(response => 
        setRepositories(response.data)
      )
    }

    loadRepositories();
  },[])

  

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repository - ${Date.now()}`,
      url: `https://github.com/${Date.now()}`,
      techs: ["Node.js", "ReactJS"]
    });
    
    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id, e) {
    e.preventDefault()
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
   
  }

  return (
    <div>
      <ul data-testid="repository-list">
      { 
        repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={(e) => handleRemoveRepository(repository.id, e)}>
              Remover
            </button>
          </li>
        )
      }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
=======
import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log(repositories)
    });
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repository - ${Date.now()}`,
      url: `https://github.com/${Date.now()}`,
      techs: ["Node.js", "ReactJS"]
    });
    
    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    console.log(id)

    await api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
            </li>
          )
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
>>>>>>> 695647403e0f09a6cb8b5a1b46303d16787d4d5c
