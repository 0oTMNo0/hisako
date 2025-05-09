import React from 'react';
import Footer from './Footer';
import './animation.css';
import NavbarItems from './NavbarItems';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <div>
      <NavbarItems />
      {children}
      <Footer />
    </div>
  );
};

export default ThemeWrapper;
