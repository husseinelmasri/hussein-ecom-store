import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getFrontendErrorMessage,
  registerUser,
} from 'utilities/firebaseFunctions';

function RegisterForm() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await registerUser(
      inputs.username,
      inputs.email,
      inputs.password
    );
    if (res.succes) {
      navigate('/');
    } else {
      setError(getFrontendErrorMessage(res.error));
    }
  };

  return (
    <form onSubmit={handleRegister} className="form">
      <h2 className="form_title">Create an account</h2>
      <div className="form_group">
        <label className="form_label" htmlFor="username">
          Username
        </label>
        <input
          className="form_input"
          onChange={handleInputChange}
          value={inputs.username}
          type="text"
          name="username"
          required
          placeholder="Enter your username"
        />
      </div>
      <div className="form_group">
        <label className="form_label" htmlFor="email">
          Email
        </label>
        <input
          className="form_input"
          onChange={handleInputChange}
          value={inputs.email}
          type="email"
          name="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="form_group">
        <label className="form_label" htmlFor="password">
          Password
        </label>
        <input
          className="form_input"
          onChange={handleInputChange}
          value={inputs.password}
          type="password"
          name="password"
          required
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
export default RegisterForm;
