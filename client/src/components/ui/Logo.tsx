interface LogoProps {
  className?: string;
}

function Logo({ className = '' }: LogoProps) {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        `}
      </style>
      <span
        className={`inline-block text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent ${className}`}
        style={{ 
          fontFamily: "'Playfair Display', serif", 
          letterSpacing: '0.01em', 
          fontStyle: 'italic',
          verticalAlign: 'baseline',
          lineHeight: '1em',
          transform: 'translateY(-2px)',
          display: 'inline-block'
        }}
      >
        resume.
      </span>
    </>
  );
}

export default Logo;

