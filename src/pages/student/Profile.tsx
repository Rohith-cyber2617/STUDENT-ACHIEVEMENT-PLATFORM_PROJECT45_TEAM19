import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { getAchievementsByUserId, Achievement } from '../../utils/localStorage';
import { User, Mail, Award, Calendar } from 'lucide-react';

export const StudentProfile = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (user) {
      const userAchievements = getAchievementsByUserId(user.id);
      setAchievements(userAchievements);
    }
  }, [user]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <p className="text-slate-400 mt-1">View your personal information and achievements</p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-600 p-4 rounded-full">
                <User className="h-12 w-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                <p className="text-slate-400">{user?.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-300">
                <Mail className="h-5 w-5 text-slate-400" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Award className="h-5 w-5 text-slate-400" />
                <span>{achievements.length} Total Achievements</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">All My Achievements</h2>
            {achievements.length === 0 ? (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No achievements yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="bg-slate-900 border border-slate-700 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{achievement.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <span className="text-slate-400 text-sm flex items-center space-x-1">
                            <Award className="h-4 w-4" />
                            <span>{achievement.category}</span>
                          </span>
                          <span className="text-slate-400 text-sm">{achievement.level}</span>
                          <span className="text-slate-400 text-sm">{achievement.position}</span>
                          <span className="text-slate-400 text-sm flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(achievement.date).toLocaleDateString()}</span>
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm mt-2">{achievement.description}</p>
                      </div>
                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium ml-4
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
