'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { login, verifyToken, githubLogin } from './action';
import { SessionProvider, useSession, signIn, SignInAuthorizationParams, signOut } from 'next-auth/react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [countdown, setCountdown] = useState(3);
    const [selectedMethod, setSelectedMethod] = useState<'password' | 'third-party'>('password');
    const [showGithubLogin, setShowGithubLogin] = useState(false);
    const [showEnvParams, setShowEnvParams] = useState(false);
    const router = useRouter();
    const { data, status } = useSession();
    const isButtonDisabled = !username || !password;
    const [response, handleRegister, isPending] = useActionState(async (_: RegisterResponse | null, formdata: FormData) => await login(formdata), null);
    const { code, msg, jwt } = response ?? {};
    const [gitCode, setGitCode] = useState(1);
    const [gitMsg, setGitMsg] = useState('');

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token") || '';
            if (await verifyToken(token)) router.push("/");
            try {
                if (status === "authenticated") {
                    handleGithubLogin();
                    const githubLoginRes = await githubLogin(data.user?.name || "");
                    if (githubLoginRes.code === 1) {
                        localStorage.setItem('token', githubLoginRes.jwt ?? '');
                        router.push("/");
                    }
                    else if (githubLoginRes.code === 2) router.push("/register");
                    else {
                        setGitCode(0);
                        setGitMsg(githubLoginRes.msg ?? "Github第三方登录失败，请联系管理员。");
                        signOut();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkToken();
    }, [router, status])

    useEffect(() => {
        if (code === 1) {
            const interval = setInterval(() => {
                localStorage.setItem('token', jwt ?? '');
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        router.push('/');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [code, router]);

    const handleGithubLogin = () => {
        setUsername('');
        setPassword('');
        setShowGithubLogin(true);
        setSelectedMethod('third-party');
    };

    return (
        <div style={styles.container}>
            <div style={styles.imageContainer}>
                <Image src="/next.svg" alt="Next.js Logo" width={100} height={100} style={styles.image} />
            </div>
            <div style={styles.form}>
                {code === 1 ? (
                    <div style={styles.successMessage}>
                        登录成功，{countdown}秒后自动跳转到主页
                    </div>
                ) : (
                    <>
                        <div style={styles.loginMethodButtons}>
                            <button
                                style={selectedMethod === 'password' ? styles.selectedMethodButton : styles.loginMethodButton}
                                onClick={() => {
                                    setSelectedMethod('password');
                                    setShowGithubLogin(false);
                                }}
                            >
                                密码登录
                            </button>
                            <button
                                style={selectedMethod === 'third-party' ? styles.selectedMethodButton : styles.loginMethodButton}
                                onClick={handleGithubLogin}
                            >
                                三方登录
                            </button>
                        </div>
                        {code === 0 && !showGithubLogin && <div style={styles.errorMessage}>{msg}</div>}
                        {showGithubLogin ? (
                            <SessionProvider>
                                {gitCode === 0 && <div style={styles.errorMessage}>{gitMsg}</div>}
                                {showEnvParams && <div style={styles.envParamsBox}>
                                    AUTH_GITHUB_ID: {process.env.NEXT_PUBLIC_AUTH_GITHUB_ID}
                                    <br />
                                    AUTH_GITHUB_SECRET: {process.env.NEXT_PUBLIC_AUTH_GITHUB_SECRET}
                                </div>}
                                <div onMouseEnter={() => setShowEnvParams(true)} 
                                    onMouseLeave={() => setShowEnvParams(false)}
                                    style={styles.githubLogin}
                                    onClick={() => signIn('github', { redirect: false })}>
                                    使用Github登录
                                </div>
                            </SessionProvider>
                        ) : (
                            <form action={handleRegister}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        style={styles.input}
                                        placeholder="请输入用户名"
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>password</label>
                                    <div style={styles.passwordContainer}>
                                        <input
                                            type="password"
                                            value={password}
                                            id="password"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={styles.input}
                                            placeholder="请输入至少6位密码"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    style={isButtonDisabled ? styles.buttonDisabled : styles.button}
                                    disabled={isButtonDisabled}
                                >
                                    {isPending ? "登录中..." : "登录"}
                                </button>
                            </form>
                        )}
                        {/* 注册用户的链接 */}
                        <a
                            href="/register"
                            style={styles.registerLink}
                        >
                            注册用户
                        </a>
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
        background: 'linear-gradient(90deg, #1CD8D2, #93EDC7)',
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
        background: 'linear-gradient(90deg, #1CD8D2, #93EDC7)',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        textAlign: 'left' as const,
        width: '400px',
    },
    loginMethodButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    loginMethodButton: {
        flex: 1,
        padding: '10px 20px',
        margin: '0 5px',
        backgroundColor: '#0077b6',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    selectedMethodButton: {
        flex: 1,
        padding: '10px 20px',
        margin: '0 5px',
        backgroundColor: '#38b6ff', 
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    envParamsBox: {
        position: 'absolute', 
        top: 'calc(50% - 100px)', 
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        width: '567px',
        height: '80px',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
        transition: 'opacity 0.3s', 
    },
    githubLogin: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        marginTop: '20px',
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
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
        width: '81px',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        outline: 'none',
        fontSize: '16px',
        boxSizing: 'border-box',
        width: '100%',
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
        transition: 'background-color 0.3s',
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
        transition: 'background-color 0.3s',
    },
    registerLink: {
        display: 'block',
        textAlign: 'right',
        marginTop: '10px',
        color: '#1f7a8c',
        textDecoration: 'none',
        fontSize: '14px',
        transition: 'color 0.3s',
    },
    registerLinkHover: {
        display: 'block',
        textAlign: 'right',
        marginTop: '10px',
        color: '#005f8f',
        textDecoration: 'none',
        fontSize: '14px',
        transition: 'color 0.3s',
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
};

export default Login;