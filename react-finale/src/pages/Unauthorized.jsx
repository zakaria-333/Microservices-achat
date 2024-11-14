import React from 'react';

const Unauthorized = () => {
  return (
    <>
      <div style={{
        position: 'absolute',
        width: '100%',
        bottom: 0,
        top: 0,
        background: 'repeating-linear-gradient(90deg, transparent, transparent 80px, #6f7376 80px, #181617 100px)',
        zIndex: 2,
        animation: 'close 3s linear'
      }}></div>
      <h1 style={{
        position: 'fixed',
        zIndex: 1,
        fontSize: '23em',
        color: '#000',
        margin: 'auto',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 0,
        backgroundColor: '#E4E4E1',
        backgroundImage: 'radial-gradient(at top center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.03) 100%), linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(143,152,157,0.60) 100%)',
        backgroundBlendMode: 'normal, multiply',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <span style={{
          position: 'relative'
        }}>
          403
          <span style={{
            content: '"403"',
            position: 'absolute',
            top: 0,
            bottom: '-96px',
            left: '40px',
            transform: 'scaleY(0.6) rotateX(-75deg) skewX(-10deg)',
            transformOrigin: '50% 100%',
            opacity: 0.2,
            lineHeight: 1
          }}></span>
        </span>
      </h1>
      <style>{`
        @keyframes close {
          0% { left: -75%; }
          100% { left: 0% }
        }
      `}</style>
    </>
  );
};

export default Unauthorized;
