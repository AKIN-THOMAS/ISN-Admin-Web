import { useAppSelector } from '@/store'

const Header = () => {
  const authState = useAppSelector(state => state.auth)
  const user = authState?.user

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              ISN Admin Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Welcome, {user?.firstName || 'User'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header