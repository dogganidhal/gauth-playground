import './App.css';
import React, {useState} from "react";
import GoogleLogin from "react-google-login";

function App() {
  const [clientId, setClientId] = useState(localStorage.getItem("clientId"));
  const [scopes, setScopes] = useState(localStorage.getItem("scopes"));
  const [clientIdDraft, setClientIdDraft] = useState();
  const [token, setToken] = useState();
  const [error, setError] = useState();

  if (clientId && scopes) {
    return (
      <div>
        <GoogleLogin
            clientId={clientId}
            buttonText="Login with google"
            scope={scopes}
            onSuccess={response => setToken(response.accessToken)}
            onFailure={error => setError(error)}
        />
        <button onClick={() => {
           localStorage.setItem("scopes", undefined);
           localStorage.setItem("clientId", undefined);
           setClientId(undefined);
           setScopes(undefined);
        }}>Clear Client Id and Scopes</button>
          {
              token && <div>
                  <h6>Token :</h6>
                  <code>{token}</code>
              </div>
          }
          {
              error && <div>
                  <h6>Error :</h6>
                  <code>{JSON.stringify(error, null, 2)}</code>
              </div>
          }
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="clientId">Client ID</label>
      <input id="clientId" name="clientId" onChange={event => setClientIdDraft(event.target.value)}/>
      <label htmlFor="scopes">Scopes</label>
      <input id="scopes" name="scopes" onChange={event => {
          localStorage.setItem("scopes", event.target.value);
          setScopes(event.target.value);
      }}/>
      <button onClick={() => {
          localStorage.setItem("clientId", clientIdDraft);
          setClientId(clientIdDraft);
      }}>Set Client Id</button>
    </div>
  );
}

export default App;
