import React from 'react';
import type { User } from '../types/user';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="card">
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p>No users registered yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user, index) => (
            <li
              key={index}
              style={{
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border-color)',
                textAlign: 'left',
              }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
