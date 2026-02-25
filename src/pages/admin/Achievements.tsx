import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { getAchievements, updateAchievement, Achievement, getUsers } from '../../utils/localStorage';
import { CheckCircle, XCircle, Filter } from 'lucide-react';

export const AdminAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [users, setUsers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const allAchievements = getAchievements();
    setAchievements(allAchievements);
    setFilteredAchievements(allAchievements);

    const allUsers = getUsers();
    const userMap: { [key: string]: string } = {};
    allUsers.forEach(user => {
      userMap[user.id] = user.name;
    });
    setUsers(userMap);
  }, []);

  useEffect(() => {
    if (categoryFilter === 'All') {
      setFilteredAchievements(achievements);
    } else {
      setFilteredAchievements(achievements.filter(a => a.category === categoryFilter));
    }
  }, [categoryFilter, achievements]);

  const handleApprove = (id: string) => {
    updateAchievement(id, { status: 'Approved' });
    const updated = getAchievements();
    setAchievements(updated);
  };

  const handleReject = (id: string) => {
    updateAchievement(id, { status: 'Rejected' });
    const updated = getAchievements();
    setAchievements(updated);
  };

  const categories = ['All', 'Sports', 'Technical', 'Cultural', 'Hackathon', 'Others'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">All Achievements</h1>
            <p className="text-slate-400 mt-1">Review and manage student achievements</p>
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="h-5 w-5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          {filteredAchievements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400">No achievements found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="text-left py-4 px-6 text-slate-300 font-medium">Student</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-medium">Title</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-medium">Category</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-medium">Level</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-medium">Position</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-medium">Status</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAchievements.map((achievement) => (
                    <tr key={achievement.id} className="border-t border-slate-700">
                      <td className="py-4 px-6 text-white">{users[achievement.userId] || 'Unknown'}</td>
                      <td className="py-4 px-6">
                        <div className="text-white font-medium">{achievement.title}</div>
                        <div className="text-slate-400 text-sm">{achievement.description.substring(0, 60)}...</div>
                      </td>
                      <td className="py-4 px-6 text-slate-400">{achievement.category}</td>
                      <td className="py-4 px-6 text-slate-400">{achievement.level}</td>
                      <td className="py-4 px-6 text-slate-400">{achievement.position}</td>
                      <td className="py-4 px-6">
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
                      <td className="py-4 px-6">
                        {achievement.status === 'Pending' && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleApprove(achievement.id)}
                              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleReject(achievement.id)}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        )}
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
