'use server';

export const action = async (formData: FormData): Promise<RegisterResponse> => {
    'use server';

    const username = formData.get('usename');
    const password = formData.get('password');
    if (username.trim() === '' || password.length < 6) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 调用注册 API
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // 注册成功
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
      } else {
        // 注册失败
        setError('注册失败，请联系管理员。');
      }
    } catch (error) {
      console.error(error);
      setError('注册失败，请联系管理员。');
    }

    setLoading(false);
  };