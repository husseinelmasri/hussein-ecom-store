import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getFrontendErrorMessage,
  signInUser,
} from 'utilities/firebaseFunctions';

function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signInUser(email, password);
    if (res.succes) {
      navigate('/');
    } else {
      setError(getFrontendErrorMessage(res.error));
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2 className="form_title">Log into your account</h2>
      <div className="form_group">
        <label className="form_label" htmlFor="username">
          Username
        </label>
        <input
          className="form_input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          id="email"
          required
          placeholder="Enter your Email"
        />
      </div>
      <div className="form_group">
        <label className="form_label" htmlFor="password">
          Password
        </label>
        <input
          className="form_input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          required
          type="password"
          placeholder="Enter your password"
        />
      </div>
      {error && (
        <div className="form_group">
          <div className="form_error">{error}</div>
        </div>
      )}
      <button className="form_button primary" type="submit">
        Register
      </button>
    </form>
  );
}

export default LogInForm;
