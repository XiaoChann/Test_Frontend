import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {
  const [avatarURL, setAvatarURL] = useState();
  const [githubUsername, setgithubUsername] = useState();
  const [repoData, setRepoData] = useState();


  async function repoDataURL() {
    // Get repo data abaout github user
    await fetch("https://api.github.com/users/XiaoChann/repos")
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(36, result);
        const list = result.map((item) => (
          <div className="text-center">
            <a target="_blank" href={item.svn_url}>
              {item.name}
            </a>
          </div>
        ));
        setRepoData(list);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  
  useEffect(() => {
    fetch("https://api.github.com/users/XiaoChann")
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result);
        setAvatarURL(result.avatar_url);
        setgithubUsername(result.login)
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  
  return (
    <div className="App App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column">
         <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={avatarURL}/>
      <Card.Body>
        <Card.Title>
        {githubUsername}
        </Card.Title>
        <Button variant="primary" onClick = {repoDataURL}>List My Public Repost</Button>
      </Card.Body>
    </Card>
    {repoData}
    </div>
  );
}

export default App;
