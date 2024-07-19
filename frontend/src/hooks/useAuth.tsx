import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

import { useLocalStorage } from './useLocalStorage'
import { auth } from '../services/firebase'

interface AuthProviderProps {
  children: React.ReactNode
}

interface SignInProps {
  email: string
  password: string
}

interface SignUpProps {
  email: string
  password: string
}

type User = {
  role: string
}

interface AuthContextType {
  isLoggedIn: boolean
  token?: string
  user?: User
  signIn: (props: SignInProps) => Promise<void>
  signUp: (props: SignUpProps) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage('token', null)
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()

  const signIn = async ({ email, password }: SignInProps) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const accessToken = await userCredential.user.getIdToken()
    setToken(accessToken)
    setUser(userCredential.user)
    navigate('/')
  }

  const signUp = async ({ email, password }: SignUpProps) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const accessToken = await userCredential.user.getIdToken()
    setToken(accessToken)
    setUser(userCredential.user)
    navigate('/')
  }

  const signOut = () => {
    setToken(null)
    setUser(null)
    navigate('/sign-in')
  }

  // useEffect(() => {
  //   if (token) {
  //     api
  //       .post('/auth/verify', null, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .catch((error) => {
  //         console.error(error)
  //         setToken(null)
  //         setUser(null)
  //       })
  //   }
  // }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
