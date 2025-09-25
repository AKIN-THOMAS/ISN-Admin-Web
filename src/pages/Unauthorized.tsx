import { useNavigate } from 'react-router-dom'
import { Button, MetadataText } from '@/components/common'
import { ROUTES } from '@/constants/routes'
import { useAppSelector } from '@/store'

const Unauthorized = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAppSelector(state => state.auth)

  const handleGoBack = () => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD)
    } else {
      navigate(ROUTES.AUTH.LOGIN)
    }
  }

  const handleGoHome = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-primary-500 mb-2">401</h1>
          <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
          </p>
          <MetadataText className="text-gray-500 dark:text-gray-500">
            Error Code: UNAUTHORIZED_ACCESS
          </MetadataText>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleGoBack}
            size="md"
            className="w-full"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Go to Login'}
          </Button>
          
          <Button 
            onClick={handleGoHome}
            variant="ghost"
            size="sm"
            className="w-full"
          >
            Return Home
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <MetadataText className="text-gray-500 dark:text-gray-500">
            Need help? Contact support at{' '}
            <a 
              href="mailto:support@isn.com" 
              className="text-primary-500 hover:text-primary-600 underline"
            >
              support@isn.com
            </a>
          </MetadataText>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized