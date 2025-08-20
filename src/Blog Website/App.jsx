import React, { useState } from 'react';
import { Search, Menu, X, Calendar, User, Tag, ArrowRight, Heart, MessageCircle, Share2 } from 'lucide-react';
import './Blog Website/App.scss';

// Header Component
const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          {/* Logo */}
          <div className="header__logo">
            <h1>TechBlog</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="header__nav">
            <a href="#" className="header__nav-link">Home</a>
            <a href="#" className="header__nav-link">Technology</a>
            <a href="#" className="header__nav-link">Design</a>
            <a href="#" className="header__nav-link">Programming</a>
            <a href="#" className="header__nav-link">About</a>
          </nav>
          
          {/* Search and Mobile Menu */}
          <div className="header__actions">
            <button className="header__search-btn">
              <Search size={20} />
            </button>
            <button 
              className="header__menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="header__mobile-menu">
            <nav className="header__mobile-nav">
              <a href="#" className="header__mobile-link">Home</a>
              <a href="#" className="header__mobile-link">Technology</a>
              <a href="#" className="header__mobile-link">Design</a>
              <a href="#" className="header__mobile-link">Programming</a>
              <a href="#" className="header__mobile-link">About</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h2 className="hero__title">Welcome to TechBlog</h2>
          <p className="hero__subtitle">
            Discover the latest insights in technology, design, and programming. 
            Stay ahead with expert tutorials and industry trends.
          </p>
          <button className="hero__cta-btn">
            Start Reading
            <ArrowRight className="hero__cta-icon" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

// Blog Card Component
const BlogCard = ({ post }) => {
  return (
    <article className="blog-card">
      <div className="blog-card__image"></div>
      <div className="blog-card__content">
        <div className="blog-card__meta">
          <div className="blog-card__date">
            <Calendar size={16} />
            <span>{post.date}</span>
          </div>
          <div className="blog-card__author">
            <User size={16} />
            <span>{post.author}</span>
          </div>
        </div>
        
        <h3 className="blog-card__title">{post.title}</h3>
        
        <p className="blog-card__excerpt">{post.excerpt}</p>
        
        <div className="blog-card__footer">
          <div className="blog-card__category">
            <Tag size={16} />
            <span>{post.category}</span>
          </div>
          
          <div className="blog-card__actions">
            <button className="blog-card__action blog-card__action--like">
              <Heart size={16} />
              <span>{post.likes}</span>
            </button>
            <button className="blog-card__action blog-card__action--comment">
              <MessageCircle size={16} />
              <span>{post.comments}</span>
            </button>
            <button className="blog-card__action blog-card__action--share">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

// Blog Grid Component
const BlogGrid = ({ posts }) => {
  return (
    <div className="blog-grid">
      {posts.map((post, index) => (
        <BlogCard key={index} post={post} />
      ))}
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  const popularPosts = [
    "Getting Started with React Hooks",
    "CSS Grid vs Flexbox: When to Use What",
    "JavaScript ES2024 New Features",
    "Building Responsive Websites"
  ];
  
  const categories = [
    { name: "React", count: 12 },
    { name: "JavaScript", count: 18 },
    { name: "CSS", count: 8 },
    { name: "Node.js", count: 6 },
    { name: "Python", count: 10 }
  ];
  
  return (
    <aside className="sidebar">
      {/* Popular Posts */}
      <div className="sidebar__widget">
        <h3 className="sidebar__widget-title">Popular Posts</h3>
        <div className="sidebar__popular-posts">
          {popularPosts.map((post, index) => (
            <a key={index} href="#" className="sidebar__popular-post">
              {post}
            </a>
          ))}
        </div>
      </div>
      
      {/* Categories */}
      <div className="sidebar__widget">
        <h3 className="sidebar__widget-title">Categories</h3>
        <div className="sidebar__categories">
          {categories.map((category, index) => (
            <div key={index} className="sidebar__category">
              <a href="#" className="sidebar__category-name">{category.name}</a>
              <span className="sidebar__category-count">({category.count})</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="sidebar__widget sidebar__widget--newsletter">
        <h3 className="sidebar__widget-title">Newsletter</h3>
        <p className="sidebar__newsletter-text">
          Get the latest posts delivered right to your inbox.
        </p>
        <div className="sidebar__newsletter-form">
          <input 
            type="email" 
            placeholder="Your email address"
            className="sidebar__newsletter-input"
          />
          <button className="sidebar__newsletter-btn">Subscribe</button>
        </div>
      </div>
    </aside>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          {/* About */}
          <div className="footer__section">
            <h3 className="footer__title">TechBlog</h3>
            <p className="footer__description">
              Your go-to source for the latest in technology, programming, and design insights.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="footer__section">
            <h4 className="footer__subtitle">Quick Links</h4>
            <div className="footer__links">
              <a href="#" className="footer__link">Home</a>
              <a href="#" className="footer__link">About</a>
              <a href="#" className="footer__link">Contact</a>
              <a href="#" className="footer__link">Privacy Policy</a>
            </div>
          </div>
          
          {/* Categories */}
          <div className="footer__section">
            <h4 className="footer__subtitle">Categories</h4>
            <div className="footer__links">
              <a href="#" className="footer__link">Technology</a>
              <a href="#" className="footer__link">Programming</a>
              <a href="#" className="footer__link">Design</a>
              <a href="#" className="footer__link">Tutorials</a>
            </div>
          </div>
          
          {/* Social */}
          <div className="footer__section">
            <h4 className="footer__subtitle">Follow Us</h4>
            <div className="footer__social">
              <a href="#" className="footer__social-link">Twitter</a>
              <a href="#" className="footer__social-link">GitHub</a>
              <a href="#" className="footer__social-link">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">© 2025 TechBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Sample blog posts data
  const blogPosts = [
    {
      title: "Understanding React State Management",
      excerpt: "Learn the fundamentals of state management in React applications, including useState, useEffect, and when to use context or external libraries.",
      author: "John Doe",
      date: "Mar 15, 2025",
      category: "React",
      likes: 24,
      comments: 8
    },
    {
      title: "CSS Grid Layout: A Complete Guide",
      excerpt: "Master CSS Grid with this comprehensive guide covering all properties, practical examples, and real-world use cases for modern web layouts.",
      author: "Jane Smith",
      date: "Mar 12, 2025",
      category: "CSS",
      likes: 31,
      comments: 12
    },
    {
      title: "JavaScript Performance Optimization",
      excerpt: "Discover proven techniques to optimize your JavaScript code for better performance, including bundling, lazy loading, and memory management.",
      author: "Mike Johnson",
      date: "Mar 10, 2025",
      category: "JavaScript",
      likes: 45,
      comments: 18
    },
    {
      title: "Building RESTful APIs with Node.js",
      excerpt: "Step-by-step tutorial on creating robust RESTful APIs using Node.js, Express, and MongoDB with authentication and error handling.",
      author: "Sarah Wilson",
      date: "Mar 8, 2025",
      category: "Node.js",
      likes: 38,
      comments: 15
    },
    {
      title: "Modern Web Design Principles",
      excerpt: "Explore current design trends, accessibility guidelines, and user experience best practices for creating engaging web interfaces.",
      author: "Alex Chen",
      date: "Mar 5, 2025",
      category: "Design",
      likes: 29,
      comments: 9
    },
    {
      title: "TypeScript for Beginners",
      excerpt: "Get started with TypeScript and learn how it enhances JavaScript development with static typing, interfaces, and better tooling support.",
      author: "Emma Davis",
      date: "Mar 3, 2025",
      category: "TypeScript",
      likes: 42,
      comments: 21
    }
  ];
  
  return (
    <div className="app">
      {/* Header */}
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <main className="main">
        <div className="main__container">
          <div className="main__content">
            {/* Blog Posts */}
            <div className="main__blog-section">
              <h2 className="main__section-title">Latest Posts</h2>
              <BlogGrid posts={blogPosts} />
            </div>
            
            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;