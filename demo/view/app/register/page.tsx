'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  const handleRegister = async () => {
    if (username.trim() === '' || password.length < 6) {
      return;
    }

    setLoading(true);
    setError('');

    // 模拟注册请求
    try {
      // 模拟网络请求延迟
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);

      // 模拟注册成功
      setSuccess(true);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            router.push('/login');
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError('注册失败，请联系管理员');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {success ? (
          <div style={styles.successMessage}>
            注册成功，{countdown}秒后自动跳转到登录页
          </div>
        ) : (
          <>
            <div style={styles.inputGroup}>
              <label>username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label
                style={password.length < 6 ? styles.errorLabel : undefined}
              >
                password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={password.length < 6 ? styles.errorInput : styles.input}
              />
              {password.length < 6 && (
                <div style={styles.passwordError}>密码不能小于6位</div>
              )}
            </div>
            <button
              onClick={handleRegister}
              disabled={username.trim() === '' || password.length < 6 || loading}
              style={styles.button}
            >
              {loading ? 'loading...' : '注册'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#a0e7e5',
  },
  form: {
    padding: '30px',
    backgroundColor: '#8fd9a8',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    textAlign: 'center' as 'center',
    width: '300px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
  },
  errorLabel: {
    color: 'red',
  },
  errorInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid red',
    borderRadius: '5px',
    outline: 'none',
  },
  passwordError: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#38b6ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
  },
  successMessage: {
    color: 'green',
    fontSize: '16px',
  },
};

export default Register;