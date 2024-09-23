'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { action } from './action'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  const [response, handleRegister, isPending] = useActionState(async (_: LoginResponse | null, formdata: FormData) => await action(formdata), null);

  // 禁用注册按钮的条件
  const isButtonDisabled = username.trim() === '' || password.length < 6 || loading;

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        {/* 加载图片，确保路径和大小 */}
        <Image src="/next.svg" alt="Next.js Logo" width={100} height={100} style={styles.image} />
      </div>
      <div style={styles.form}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {success ? (
          <div style={styles.successMessage}>
            注册成功，{countdown}秒后自动跳转到登录页
          </div>
        ) : (
          <>
            <div style={styles.inputGroup}>
              <label style={styles.label}>username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input} // username 保持普通样式
                placeholder="请输入用户名"
              />
            </div>
            <div style={styles.inputGroup}>
              <label
                style={password.length < 6 ? styles.errorLabel : styles.label} // 仅 password 变色
              >
                password
              </label>
              <div style={styles.passwordContainer}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={password.length < 6 ? styles.errorInput : styles.input} // 仅 password 输入框变色
                  placeholder="请输入至少6位密码"
                />
                {password.length < 6 && (
                  <div style={styles.passwordError}>密码不能小于6位</div> // 提示文字在 password 输入框下方
                )}
              </div>
            </div>
            <button
              onClick={handleRegister}
              disabled={isButtonDisabled} // 根据条件禁用按钮
              style={isButtonDisabled ? styles.buttonDisabled : styles.button}
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
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '80px', // 调整与输入框之间的间距
  },
  image: {
    width: '100%', // 图片宽度为容器宽度
  },
  form: {
    padding: '30px',
    backgroundColor: '#8fd9a8',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    textAlign: 'left' as 'left',
    width: '350px', // 固定输入框宽度
  },
  inputGroup: {
    marginBottom: '20px',
    display: 'flex', // 使用 flex 布局保持 label 和 input 水平对齐
    alignItems: 'center', // 垂直居中对齐
  },
  passwordContainer: {
    flex: 1, // 填满剩余宽度
    display: 'flex',
    flexDirection: 'column', // 使输入框和错误信息纵向排列
  },
  label: {
    fontSize: '18px', // 增大标签文字大小
    marginRight: '10px', // 与输入框保持间距
    width: '100px', // 固定宽度
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
    color: 'red', // 改变标签颜色为红色
  },
  errorInput: {
    padding: '10px',
    border: '1px solid red', // 改变输入框边框颜色为红色
    borderRadius: '5px',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: '#ffe6e6', // 改变背景颜色为浅红色
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
    whiteSpace: 'nowrap', // 保持文字在一行
  },
};

export default Register;