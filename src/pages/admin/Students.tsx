import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { getUsers, getAchievements, User, Achievement } from '../../utils/localStorage';
import { Users as UsersIcon, Award, Mail } from 'lucide-react';

export const AdminStudents = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [achievementCounts, setAchievementCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const allUsers = getUsers();
    const studentUsers = allUsers.filter(u => u.role === 'Student');
    setStudents(studentUsers);

    const allAchievements = getAchievements();
    const counts: { [key: string]: number } = {};
    allAchievements.forEach((achievement: Achievement) => {
      counts[achievement.userId] = (counts[achievement.userId] || 0) + 1;
    });
    setAchievementCounts(counts);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">All Students</h1>
          <p className="text-slate-400 mt-1">View all registered students</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          {students.length === 0 ? (
            <div className="text-center py-12">
              <UsersIcon className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No students registered yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="text-left py-4 px-6 text-slate-300 font-medium">Name</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-medium">Email</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-medium">Total Achievements</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-t border-slate-700">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-600 p-2 rounded-full">
                            <UsersIcon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{student.name}</div>
                            <div className="text-slate-400 text-sm">{student.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2 text-slate-400">
                          <Mail className="h-4 w-4" />
                          <span>{student.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Award className="h-5 w-5 text-blue-500" />
                          <span className="text-white font-semibold">
                            {achievementCounts[student.id] || 0}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Students</p>
                <p className="text-white text-2xl font-bold mt-1">{students.length}</p>
              </div>
              <UsersIcon className="h-10 w-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Students</p>
                <p className="text-white text-2xl font-bold mt-1">
                  {Object.keys(achievementCounts).length}
                </p>
              </div>
              <Award className="h-10 w-10 text-green-500" />
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Achievements</p>
                <p className="text-white text-2xl font-bold mt-1">
                  {students.length > 0
                    ? (Object.values(achievementCounts).reduce((a, b) => a + b, 0) / students.length).toFixed(1)
                    : 0}
                </p>
              </div>
              <Award className="h-10 w-10 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
