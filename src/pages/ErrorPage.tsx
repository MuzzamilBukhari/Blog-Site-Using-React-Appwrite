import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-4">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="text-blue-500 hover:underline">
                Go Back Home
            </Link>
        </div>
    )
}

export default ErrorPage
