import { Routes, Route } from 'react-router-dom'

import { Tasks } from './routes/tasks'
import { SignIn } from './routes/sign-in'
import { SignUp } from './routes/sign-up'
import { Members } from './routes/members'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/members" element={<Members />} />
    </Routes>
  )
}
