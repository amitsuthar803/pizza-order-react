import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Button({ children, disabled, to, type, onClick }) {
  const base = `cursor-pointer text-sm bg-yellow-400 transition-color hover:bg-yellow-300 uppercase rounded-full tracking-wide font-semibold inline-block text-stone-800 duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:bg-yellow-300 disabled:cursor-not-allowed`;

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    secondary: `cursor-pointer 
    transition-color border-2 
    text-sm border-stone-300 hover:bg-stone-300 uppercase hover:text-stone-800 rounded-full tracking-wide font-semibold inline-block text-stone-400 duration-300 focus:outline-none focus:text-stone-800 focus:ring focus:ring-stone-200 focus:ring-offset-2 focus:bg-stone-300 disabled:cu rsor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5`,
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} onClick={onClick} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
