import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { getAllUsers } from '../api/authApi';
import { Users, Shield, User } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data.users || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] font-sans flex flex-col md:flex-row">
      <AdminSidebar />
      
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2B1723] flex items-center gap-3">
              <Users className="w-8 h-8 text-[#5A123E]" />
              Users
            </h1>
            <p className="text-gray-600 mt-1">Manage registered customers and administrators</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center shadow-sm">
              {error}
            </div>
          )}

          {/* Content */}
          <div className="bg-[#FFFDF5] rounded-3xl shadow-sm border border-[#EBDDBF]/50 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="text-[#5A123E] font-bold animate-pulse text-lg">
                  Loading users...
                </div>
              </div>
            ) : users.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-[#2B1723] text-lg font-bold mb-2">No users found</p>
                <p className="text-gray-500">Your store hasn't received any registrations yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8EED8] border-b border-[#EBDDBF]/50">
                      <th className="py-4 px-6 font-bold text-[#2B1723] text-sm uppercase tracking-wide whitespace-nowrap">Name</th>
                      <th className="py-4 px-6 font-bold text-[#2B1723] text-sm uppercase tracking-wide whitespace-nowrap">Email</th>
                      <th className="py-4 px-6 font-bold text-[#2B1723] text-sm uppercase tracking-wide whitespace-nowrap">Role</th>
                      <th className="py-4 px-6 font-bold text-[#2B1723] text-sm uppercase tracking-wide whitespace-nowrap">Registered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EBDDBF]/30">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-[#FFF8E8]/50 transition-colors">
                        <td className="py-4 px-6 whitespace-nowrap">
                          <p className="font-bold text-[#2B1723]">{user.name}</p>
                        </td>
                        <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          {user.role === 'admin' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#5A123E]/10 text-[#5A123E] border border-[#5A123E]/20">
                              <Shield className="w-3.5 h-3.5" />
                              Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 border border-gray-200">
                              <User className="w-3.5 h-3.5" />
                              User
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleDateString(undefined, { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;
