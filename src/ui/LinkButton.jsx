import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = "text-sm hover:underline hover:text-blue-600 text-blue-500";

  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
