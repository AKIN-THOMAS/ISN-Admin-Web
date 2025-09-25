import { useAppSelector } from '@/store'
import { FinePrint } from '@/components/common'

const Dashboard = () => {
  const user = useAppSelector(state => state.auth.user)

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {user?.firstName} {user?.lastName}!
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              1,234
            </p>
            <FinePrint variant="subtle" className="text-fine-sm mt-2">
              +12% from last month
            </FinePrint>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Active Sessions
            </h3>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              567
            </p>
            <FinePrint variant="subtle" className="text-fine-sm mt-2">
              +5% from yesterday
            </FinePrint>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Revenue
            </h3>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              $89,234
            </p>
            <FinePrint variant="subtle" className="text-fine-sm mt-2">
              +8% from last week
            </FinePrint>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { action: 'User login', user: 'john.doe@example.com', time: '2 minutes ago' },
              { action: 'Password reset', user: 'jane.smith@example.com', time: '5 minutes ago' },
              { action: 'Profile updated', user: 'mike.wilson@example.com', time: '10 minutes ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <FinePrint variant="subtle" className="text-fine-sm">
                    {activity.user}
                  </FinePrint>
                </div>
                <FinePrint variant="muted" className="text-fine-xs">
                  {activity.time}
                </FinePrint>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard