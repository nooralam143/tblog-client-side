import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <div>
            <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-lg text-gray-600">Page Not Found</p>
                <p className="mt-4 text-gray-600">Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="mt-6 hover:underline btn btn-primary text-white">Go Back</Link>
            </div>
        </div>
        </div>

    );
};

export default ErrorPage;