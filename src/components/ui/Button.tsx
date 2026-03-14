import { motion } from 'framer-motion';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps) => {
  const buttonClass = `btn btn-${variant} ${className}`;

  const motionProps = {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  };

  if (href) {
    return (
      <motion.a href={href} className={buttonClass} aria-label={ariaLabel} {...motionProps}>
        <span className="btn-content">{children}</span>
        {variant === 'primary' && <span className="btn-shimmer" />}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={buttonClass} aria-label={ariaLabel} disabled={disabled} {...motionProps}>
      <span className="btn-content">{children}</span>
      {variant === 'primary' && <span className="btn-shimmer" />}
    </motion.button>
  );
};

export default Button;
