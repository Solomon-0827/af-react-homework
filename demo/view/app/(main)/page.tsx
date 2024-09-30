
'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
}

const generateRandomBalls = (count: number): Ball[] => {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * 700 + 50, 
    y: Math.random() * 500 + 50, 
    dx: Math.random() * 4 - 2, 
    dy: Math.random() * 4 - 2, 
    color: getRandomColor(), 
  }));
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const containerSize = { width: 1240, height: 600 };

export default function ComplexAnimation() {
  return (
    <div style={styles.container}>
      <motion.div
        style={styles.box}
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 45, -45, 0],
          borderRadius: ["20%", "50%", "20%"],
          backgroundColor: ["#3498db", "#2ecc71", "#9b59b6", "#3498db"],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    background: 'linear-gradient(135deg, #FC354C, #0ABFBC)',
    overflow: 'hidden', 
    position: 'relative',
    width: `100%`, 
    height: `100%`, 
  },
  box: {
    width: '150px',
    height: '150px',
    backgroundColor: '#3498db',
    borderRadius: '20%',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
    position: 'absolute', 
    zIndex: 1, 
  },
  circle: {
    position: 'absolute',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    opacity: 0.7,
  },
};