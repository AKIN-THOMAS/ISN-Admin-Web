const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
          Page not found
        </p>
        <p className="text-gray-500 dark:text-gray-500 mt-2">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  )
}

export default NotFound