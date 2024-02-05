import { useSelector } from "react-redux";

function Username() {
  // accesing username from redux
  const username = useSelector((state) => state.user.username);

  // if (!username) return null;

  return (
    <div className="md:block hidden text-sm font-semibold ">{username}</div>
  );
}

export default Username;
