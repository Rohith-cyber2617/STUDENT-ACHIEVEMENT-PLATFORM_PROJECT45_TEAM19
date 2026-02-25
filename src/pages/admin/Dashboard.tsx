import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { getUsers, getAchievements, Achievement } from '../../utils/localStorage';
import { Users, Award, CheckCircle, Clock } from 'lucide-react';

export const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const users = getUsers();
    const students = users.filter(u => u.role === 'Student');
    setTotalStudents(students.length);

    const allAchievements = getAchievements();
    setAchievements(allAchievements);
  }, []);

  const totalAchievements = achievements.length;
  const approvedCount = achievements.filter(a => a.status === 'Approved').length;
  const pendingCount = achievements.filter(a => a.status === 'Pending').length;

  const stats = [
    {
      label: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Achievements',
      value: totalAchievements,
      icon: Award,
      color: 'bg-purple-500',
    },
    {
      label: 'Approved',
      value: approvedCount,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      label: 'Pending Review',
      value: pendingCount,
      icon: Clock,
      color: 'bg-yellow-500',
    },
  ];

  const categoryStats = [
    { name: 'Sports', count: achievements.filter(a => a.category === 'Sports').length },
    { name: 'Technical', count: achievements.filter(a => a.category === 'Technical').length },
    { name: 'Cultural', count: achievements.filter(a => a.category === 'Cultural').length },
    { name: 'Hackathon', count: achievements.filter(a => a.category === 'Hackathon').length },
    { name: 'Others', count: achievements.filter(a => a.category === 'Others').length },
  ];

  const levelStats = [
    { name: 'College', count: achievements.filter(a => a.level === 'College').length },
    { name: 'State', count: achievements.filter(a => a.level === 'State').length },
    { name: 'National', count: achievements.filter(a => a.level === 'National').length },
    { name: 'International', count: achievements.filter(a => a.level === 'International').length },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage and review student achievements</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Achievements by Category</h2>
            <div className="space-y-3">
              {categoryStats.map((stat) => (
                <div key={stat.name} className="flex items-center justify-between">
                  <span className="text-slate-300">{stat.name}</span>
                  <span className="text-white font-semibold">{stat.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Achievements by Level</h2>
            <div className="space-y-3">
              {levelStats.map((stat) => (
                <div key={stat.name} className="flex items-center justify-between">
                  <span className="text-slate-300">{stat.name}</span>
                  <span className="text-white font-semibold">{stat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
