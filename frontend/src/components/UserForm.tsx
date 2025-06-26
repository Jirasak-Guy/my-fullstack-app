import React, { useState } from 'react';

interface UserFormProps {
  onUserAdded: () => void; 
}

const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); 

    try {
      const response = await fetch('http://localhost:8080/users', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setName(''); 
      onUserAdded(); 
    } catch (err: any) {
      setError(`Failed to add user: ${err.message}`);
      console.error("Error submitting name:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add User</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default UserForm;