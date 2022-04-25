import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react'

interface AuthContext {
	jwt: string | undefined
	setJwt: Dispatch<SetStateAction<string | undefined>>
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
	jwt?: string
}

export default function AuthProvider({ children }: AuthProviderProps) {
	const [jwt, setJwt] = useState<string | undefined>()

	return (
		<authContext.Provider value={{ jwt, setJwt }}>
			{children}
		</authContext.Provider>
	)
}
