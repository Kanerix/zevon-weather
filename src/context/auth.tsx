import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react'

interface AuthContext {
	token: string | undefined
	setToken: Dispatch<SetStateAction<string | undefined>>
}

const authContext = createContext<AuthContext | undefined>(undefined)

export function useAuth(): AuthContext {
	const context = useContext(authContext)

	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider')
	}

	return context
}

interface AuthProviderProps {
	children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
	const [token, setToken] = useState<string | undefined>()

	return (
		<authContext.Provider value={{ token, setToken }}>
			{children}
		</authContext.Provider>
	)
}
