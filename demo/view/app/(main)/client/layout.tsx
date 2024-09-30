import { ReactNode } from "react";
import {InputBox} from "./client";

export default ({ children }: { children: ReactNode }) => {
  return (
    <div style={styles.container}>
        <InputBox />
        <div>
          {children}
        </div>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    minHeight: '100%',
    borderRadius: '8px', 
    background: 'linear-gradient(135deg, #d53369, #cbad6d)',
    boxSizing: 'border-box' as 'border-box',
  },
};