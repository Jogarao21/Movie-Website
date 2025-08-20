import React, { useState, useEffect, useRef } from 'react';
import './Authentication.css';

// Auth Context
const AuthContext = React.createContext();

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Network Background Component
const NetworkBackground = ({ canvasRef }) => {
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      const maxDistance = 100;
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(100, 181, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.shadowColor = 'rgba(100, 181, 246, 0.5)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return null;
};

// Auth Modal Component
const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
    confirmPassword: '',
    remember: false,
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const { login } = React.useContext(AuthContext);

  useEffect(() => {
    setCurrentMode(initialMode);
  }, [initialMode]);

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      fullname: '',
      confirmPassword: '',
      remember: false,
      terms: false
    });
    setErrors({});
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (currentMode === 'signup' && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (currentMode === 'signup') {
      if (!formData.fullname.trim()) {
        newErrors.fullname = 'Full name is required';
      }
      
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.terms) {
        newErrors.terms = 'Please accept the Terms & Conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      if (currentMode === 'login') {
        login({ email: formData.email, name: formData.email.split('@')[0] });
        onClose();
      } else {
        setCurrentMode('login');
        resetForm();
      }
    }, 2000);
  };

  const switchMode = (mode) => {
    if (isAnimating || currentMode === mode) return;
    setIsAnimating(true);
    setCurrentMode(mode);
    resetForm();
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-overlay">
      <canvas ref={canvasRef} className="auth-canvas" />
      <NetworkBackground canvasRef={canvasRef} />
      
      <div className="auth-modal">
        <button onClick={onClose} className="auth-close-btn">
          ✕
        </button>

        <h2 className="auth-title">
          {currentMode === 'login' ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {currentMode === 'signup' && (
            <div className="auth-field">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-container">
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`auth-input ${errors.fullname ? 'auth-input-error' : ''}`}
                />
                <span className="auth-input-icon">👤</span>
              </div>
              {errors.fullname && <p className="auth-error">{errors.fullname}</p>}
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <div className="auth-input-container">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`auth-input ${errors.email ? 'auth-input-error' : ''}`}
              />
              <span className="auth-input-icon">✉️</span>
            </div>
            {errors.email && <p className="auth-error">{errors.email}</p>}
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-container">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={currentMode === 'login' ? 'Enter your password' : 'Create a password'}
                className={`auth-input ${errors.password ? 'auth-input-error' : ''}`}
              />
              <span className="auth-input-icon">🔒</span>
            </div>
            {errors.password && <p className="auth-error">{errors.password}</p>}
          </div>

          {currentMode === 'signup' && (
            <div className="auth-field">
              <label className="auth-label">Confirm Password</label>
              <div className="auth-input-container">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={`auth-input ${errors.confirmPassword ? 'auth-input-error' : ''}`}
                />
                <span className="auth-input-icon">🔒</span>
              </div>
              {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword}</p>}
            </div>
          )}

          <div className="auth-options">
            {currentMode === 'login' ? (
              <>
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                    className="auth-checkbox"
                  />
                  Remember me
                </label>
                <button type="button" className="auth-forgot-btn">
                  Forgot Password?
                </button>
              </>
            ) : (
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="auth-checkbox"
                />
                I agree to Terms & Conditions
              </label>
            )}
          </div>
          {errors.terms && <p className="auth-error">{errors.terms}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`auth-submit-btn ${isLoading ? 'auth-submit-btn-loading' : ''}`}
          >
            {isLoading ? (
              <div className="auth-loading">
                <div className="auth-spinner"></div>
                Processing...
              </div>
            ) : (
              currentMode === 'login' ? 'Login' : 'Register'
            )}
          </button>
        </form>

        <div className="auth-switch">
          {currentMode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => switchMode('signup')}
                className="auth-switch-btn"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => switchMode('login')}
                className="auth-switch-btn"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { AuthProvider, AuthContext, AuthModal };