import { RiseLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="bg-black/70 flex h-screen items-center justify-center">
      <RiseLoader margin={5} size={40} speedMultiplier={3} color="#ffd700" />
    </div>
  );
};

export default loading;
