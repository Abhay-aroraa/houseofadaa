import React from "react";
import {
  useDeleteByIdMutation,
  useGetAllUsersQuery,
} from "../../../store/api/Authapi";
import { Trash2 } from "lucide-react"; // npm install lucide-react
import Loadercomp from "../../../components/Loader";

const UserList = () => {
  const { data: users, isLoading, isError, refetch } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: deleting }] = useDeleteByIdMutation();

  // Delete handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id).unwrap();
      alert("User deleted successfully ✅");
      refetch(); // Refresh list after delete
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user ❌");
    }
  };

  if (isLoading)
    return <Loadercomp/>;
  if (isError)
    return <p className="text-center py-10 text-red-500">Failed to load users.</p>;

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-4">User List</h2>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-2">{user.id}</td>
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.role}</td>
                <td className="py-2 text-center">
                  <button
                    className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
                    onClick={() => handleDelete(user.id)}
                    disabled={deleting}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
