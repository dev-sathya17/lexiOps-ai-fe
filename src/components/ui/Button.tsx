type ButtonProps = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function Button({ className, onClick, children }: ButtonProps) {
  return (
    <button
      className={`cursor-pointer w-full gap-2 flex items-center justify-center transition py-2 sm:text-md rounded shadow-md 
              focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
