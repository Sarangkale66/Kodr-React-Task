import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Add from './pages/addUser.tsx'
import User from './pages/user.tsx'
import Home from './pages/home.tsx'
import { UserProvider } from './contextAPI/myContext.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="user" element={<User />} />
            <Route path="add" element={<Add />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </QueryClientProvider>
)
