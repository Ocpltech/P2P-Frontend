import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const variants = {
  primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  info: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
};

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  animated = false
}: BadgeProps) {
  const Component = animated ? motion.span : 'span';
  const animationProps = animated
    ? {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.2 }
      }
    : {};

  return (
    <Component
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]}`}
      {...animationProps}
    >
      {children}
    </Component>
  );
}