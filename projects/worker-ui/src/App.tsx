import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider, BaseStyles, Avatar } from '@primer/react'
import { Header } from '@primer/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider>
        <BaseStyles>
          <Header>
            <Header.Item>
              <Header.Link
                href="#"
                sx={{
                  fontSize: 2,
                }}
              >
                <span>vsx.dev</span>
              </Header.Link>
            </Header.Item>
            <Header.Item >Epoch</Header.Item>
            <Header.Item full>Validators</Header.Item>
            <Header.Item
              sx={{
                mr: 0,
              }}
            >
              <Avatar
                src="https://github.com/vsxdotdev.png"
                size={20}
                square
                alt="@vsxdotdev"
              />
            </Header.Item>
          </Header>
          <div className="page-responsive">
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </BaseStyles>
      </ThemeProvider>
    </>
  )
}

export default App
