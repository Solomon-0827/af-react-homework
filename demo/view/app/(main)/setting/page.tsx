import { Suspense } from "react";
import LazyServer, { fetchLazyLoad } from "./lazyServer";
import Client from "./client";



// 美化后的组件
export default async function Page() {
  fetchLazyLoad(3);
  return (
    <div style={styles.container}>
      <Suspense fallback={<div style={styles.loading}>Please wait for 5 seconds...</div>}>
        <LazyServer time={5}>
          <Suspense fallback={<div style={styles.loading}>Please wait for 3 seconds...</div>}>
            <LazyServer time={3}>
              <div style={styles.formContainer}>
                <Client />
              </div>
            </LazyServer>
          </Suspense>
        </LazyServer>
      </Suspense>
    </div>
  );
}

// 样式对象
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    borderRadius: '8px', // 圆角效果
    background: 'linear-gradient(135deg, #134E5E, #71B280)', // 背景色
    padding: '20px',
  },
  loading: {
    fontSize: '18px',
    fontWeight: 'bold' as 'bold',
    color: '#fff',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient( 245deg, #134E5E 1%, #71B280)', // 背景色
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 轻微阴影
    borderRadius: '8px',
    padding: '30px',
    maxWidth: '400px',
    width: '1000px',
    height: '240px',
    marginTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold' as 'bold',
    marginBottom: '20px',
    color: '#333', // 标题颜色
    textAlign: 'center' as 'center',
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box' as 'border-box',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4caf50', // 按钮背景色
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold' as 'bold',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049', // 按钮悬停颜色
  },
};