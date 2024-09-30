interface SettingServerProps {
    time: number; // 延迟加载时间，以秒为单位
    children?: React.ReactNode;
}

export const fetchLazyLoad = (time: number) => fetch(`http://localhost:8080/api/lazyLoad?time=${time}`)

export default async ({ time, children }: SettingServerProps) => {
    await fetchLazyLoad(time === 3 ? 0 : time);
    return <div>{children}</div>
}