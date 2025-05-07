import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    fetch('http://127.0.0.1:8000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then((data) => setUser(data.user)) 
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [navigate]);

  const handleLogout = () => {
    const token = localStorage.getItem('token');

    fetch('http://127.0.0.1:8000/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).finally(() => {
      localStorage.removeItem('token');
      navigate('/');
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        {user ? (
          <>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>Loading user...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
