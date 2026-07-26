'use client';

import { useState } from 'react';
import { login } from '@/app/actions/auth';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      
      {/* Left Side: Form */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        padding: '4rem',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '2rem' }}>
              <Image 
                src="/logo.png" 
                alt="Alieezz Photography" 
                width={200} 
                height={200}
                style={{ objectFit: 'contain', maxHeight: '100px', width: 'auto', mixBlendMode: 'lighten', marginLeft: '-15px' }}
                priority
              />
            </div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 300, 
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-cormorant)',
              lineHeight: 1.2
            }}>
              Welcome Back
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', fontFamily: 'var(--font-inter)' }}>
              Enter your credentials to access the portal.
            </p>
          </div>
          
          {error && (
            <div style={{ 
              backgroundColor: 'rgba(255, 107, 107, 0.05)', 
              color: '#ff6b6b', 
              padding: '1rem', 
              borderRadius: '4px', 
              marginBottom: '2rem', 
              fontSize: '0.85rem',
              borderLeft: '2px solid #ff6b6b',
              fontFamily: 'var(--font-inter)'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'var(--font-inter)' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '1rem 0', 
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border-color)', 
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }} 
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                placeholder="admin@alieezz.com"
              />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label htmlFor="password" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Password</label>
              </div>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '1rem 0', 
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border-color)', 
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                  letterSpacing: '0.2em',
                  transition: 'border-color 0.3s ease'
                }} 
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              style={{ 
                width: '100%', 
                padding: '1.2rem', 
                backgroundColor: 'var(--accent-gold)', 
                color: 'var(--bg-primary)', 
                border: 'none', 
                cursor: 'pointer', 
                fontWeight: 600, 
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginTop: '1.5rem',
                transition: 'all 0.3s ease',
                opacity: isLoading ? 0.7 : 1
              }}
              onMouseOver={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--accent-gold-light)')}
              onMouseOut={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--accent-gold)')}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>

      {/* Right Side: Image Showcase */}
      <div style={{ 
        flex: '1', 
        position: 'relative',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem'
      }} className="login-image-side">
        <Image 
          src="/portfolio-wedding.jpg" 
          alt="Alieezz Photography" 
          fill
          style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
          priority
        />
        {/* Dim overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          zIndex: 1
        }} />
        
        {/* Text over image */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '500px' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-cormorant)', 
            fontSize: '3rem', 
            fontWeight: 300, 
            color: 'var(--text-primary)', 
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            Crafting Visual Poetry
          </h2>
          <p style={{ 
            fontFamily: 'var(--font-inter)', 
            fontSize: '1.1rem', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.6,
            fontWeight: 300
          }}>
            Every frame is a canvas. Welcome back to the Alieezz Photography administrative portal, where your timeless stories are curated and preserved.
          </p>
        </div>
      </div>

      {/* Add a small style block to handle the responsive image hiding */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 900px) {
          .login-image-side {
            display: flex !important;
          }
        }
      `}} />

    </div>
  );
}
