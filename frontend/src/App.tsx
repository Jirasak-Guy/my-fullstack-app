import { useState, useEffect, useCallback } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { fetchUsers } from './services/userService';
import type { User } from './types/user';
import './App.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err: any) {
      setError(`Failed to load users: ${err.message}`);
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]); 

  const handleUserAdded = () => {
    loadUsers(); 
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm onUserAdded={handleUserAdded} />
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <UserList users={users} />}
    </div>
  );
}

export default App;