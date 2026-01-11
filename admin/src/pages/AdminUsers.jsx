import axios from "axios";
import { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:4000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      {users.map((u) => (
        <p key={u._id}>{u.email}</p>
      ))}
    </div>
  );
};

export default AdminUsers;
