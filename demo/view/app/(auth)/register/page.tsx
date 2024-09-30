'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createToken, registerNewUser } from './action'
import { useSession } from 'next-auth/react';
import { sign } from 'jsonwebtoken';
import { verifyToken } from '../login/action';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const [response, handleRegister, isPending] = useActionState(async (_: RegisterResponse | null, formdata: FormData) => await registerNewUser(formdata, status), null);
  const {code, msg, jwt} = response ?? {};
  const {data, status} = useSession();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem("token") || '';
        if (await verifyToken(token)) router.push("/");
        if (code === 1 && status === "unauthenticated") {
          const interval = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(interval);
                router.push('/login');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          return () => clearInterval(interval);
        } else if (code === 1 && status === "authenticated") {
          localStorage.setItem('token', jwt ?? '');
          router.push("/");
        }
    
        if (!code && status === "authenticated") {
          setUsername(data.user?.name || "");
        } 
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, [code, router]);

  
  const isButtonDisabled = username.trim() === '' || password.length < 6 || isPending;

  const skipRegister = () => {
    const token = createToken(username);
    localStorage.setItem('token', token);
    router.push("/");
  }

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <Image src="/next.svg" alt="Next.js Logo" width={100} height={100} style={styles.image} />
      </div>
      <div style={styles.form}>
        {code === 0 && <div style={styles.errorMessage}>{msg}</div>}
        {code === 1 && status === "unauthenticated"? (
          <div style={styles.successMessage}>
            注册成功，{countdown}秒后自动跳转到登录页
          </div>
        ) : (
          <>
          <form action={handleRegister}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>username</label>
              <input
                type="text"
                id='username'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                placeholder="请输入用户名"
              />
            </div>
            <div style={styles.inputGroup}>
              <label
                style={password.length < 6 ? styles.errorLabel : styles.label}
              >
                password
              </label>
              <div style={styles.passwordContainer}>
                <input
                  type="password"
                  value={password}
                  id='password'
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}
                  style={password.length < 6 ? styles.errorInput : styles.input}
                  placeholder="请输入至少6位密码"
                />
                {password.length < 6 && (
                  <div style={styles.passwordError}>密码不能小于6位</div>
                )}
              </div>
            </div>
            <button
              type='submit'
              disabled={isButtonDisabled}
              style={isButtonDisabled ? styles.buttonDisabled : styles.button}
            >
              {isPending ? 'Loading...' : '注册'}
            </button>
            {status === "authenticated" && <div
                style={styles.registerLink}
                onMouseEnter={() => setIsHovered(true)}  
                onMouseLeave={() => setIsHovered(false)}
                onClick={skipRegister}
            >
                跳过注册
            </div>}
          </form>
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
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '80px', 
  },
  image: {
    width: '100%', 
  },
  form: {
    padding: '30px',
    backgroundColor: '#8fd9a8',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    textAlign: 'left' as 'left',
    width: '350px', 
  },
  inputGroup: {
    marginBottom: '20px',
    display: 'flex', 
    alignItems: 'center', 
  },
  passwordContainer: {
    flex: 1, 
    display: 'flex',
    flexDirection: 'column', 
  },
  label: {
    fontSize: '18px', 
    marginRight: '10px', 
    width: '100px', 
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  errorLabel: {
    fontSize: '18px',
    marginRight: '10px',
    width: '100px',
    color: 'red', 
  },
  errorInput: {
    padding: '10px',
    border: '1px solid red', 
    borderRadius: '5px',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: '#ffe6e6', 
    boxSizing: 'border-box',
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
    fontSize: '16px',
  },
  buttonDisabled: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#ccc',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'not-allowed',
    fontSize: '16px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
    fontSize: '16px',
  },
  successMessage: {
    color: 'green',
    fontSize: '16px',
    whiteSpace: 'nowrap', 
  },
  registerLink: {
    display: 'block',
    textAlign: 'right',
    marginTop: '10px',
    color: '#1f7a8c', 
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer', 
    transition: 'color 0.3s', 
  },
};

export default Register;