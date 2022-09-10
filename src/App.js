import { withAuthenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import './App.css';
import { createPlant as createPlantMutation, deletePlant as deletePlantMutation } from './graphql/mutations';
import { listPlants } from './graphql/queries';

const initialFormState = { name: '', description: '' }

function App({ signOut }) {
  const [Plants, setPlants] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchPlants();
  }, []);

  async function fetchPlants() {
    const apiData = await API.graphql({ query: listPlants });
    setPlants(apiData.data.listPlants.items);
  }

  async function createPlant() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createPlantMutation, variables: { input: formData } });
    setPlants([ ...Plants, formData ]);
    setFormData(initialFormState);
  }

  async function deletePlant({ id }) {
    const newPlantsArray = Plants.filter(Plant => Plant.id !== id);
    setPlants(newPlantsArray);
    await API.graphql({ query: deletePlantMutation, variables: { input: { id } }});
  }
  return (
    <div className="App">
      <h1>My Plants App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Plant name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Plant description"
        value={formData.description}
      />
      <button onClick={createPlant}>Create Plant</button>
      <div style={{marginBottom: 30}}>
        {
          Plants.map(Plant => (
            <div key={Plant.id || Plant.name}>
              <h2>{Plant.name}</h2>
              <p>{Plant.description}</p>
              <button onClick={() => deletePlant(Plant)}>Delete Plant</button>
            </div>
          ))
        }
      </div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

// export default withAuthenticator(App);
export default App;