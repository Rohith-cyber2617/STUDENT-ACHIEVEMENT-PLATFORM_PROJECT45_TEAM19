import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { getAchievementsByUserId, Achievement } from '../../utils/localStorage';
import { Award, CheckCircle, Clock, Trophy } from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (user) {
      const userAchievements = getAchievementsByUserId(user.id);
      setAchievements(userAchievements);
    }
  }, [user]);

  const totalAchievements = achievements.length;
  const approvedCount = achievements.filter(a => a.status === 'Approved').length;
  const pendingCount = achievements.filter(a => a.status === 'Pending').length;
  const rejectedCount = achievements.filter(a => a.status === 'Rejected').length;

  const stats = [
    {
      label: 'Total Achievements',
      value: totalAchievements,
      icon: Award,
      color: 'bg-blue-500',
    },
    {
      label: 'Approved',
      value: approvedCount,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      label: 'Pending',
      value: pendingCount,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      label: 'Rejected',
      value: rejectedCount,
      icon: Trophy,
      color: 'bg-red-500',
    },
  ];

  const recentAchievements = achievements.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back, {user?.name}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                    <p className="text-white text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Achievements</h2>
          {recentAchievements.length === 0 ? (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No achievements yet</p>
              <p className="text-slate-500 text-sm mt-1">Start by adding your first achievement!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Title</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Level</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAchievements.map((achievement) => (
                    <tr key={achievement.id} className="border-b border-slate-700/50">
                      <td className="py-3 px-4 text-white">{achievement.title}</td>
                      <td className="py-3 px-4 text-slate-400">{achievement.category}</td>
                      <td className="py-3 px-4 text-slate-400">{achievement.level}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`
                            px-3 py-1 rounded-full text-xs font-medium
                            ${
                              achievement.status === 'Approved'
                                ? 'bg-green-500/20 text-green-500'
                                : achievement.status === 'Pending'
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-red-500/20 text-red-500'
                            }
                          `}
                        >
                          {achievement.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
