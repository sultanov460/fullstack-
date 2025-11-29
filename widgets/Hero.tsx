import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="text-center flex flex-col gap-4 h-screen justify-center items-center max-w-200 mx-auto">
      <h1 className="text-5xl font-semibold text-primary">Welcome!!!</h1>
      <p className="text-primary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At, laboriosam.
        Mollitia atque at facere perspiciatis veniam. Incidunt voluptas nostrum
        dolores molestias, repellendus a quas excepturi nisi itaque sed
        exercitationem blanditiis.
      </p>
      <button className="bg-primary text-xl text-bg px-4 py-2.5 border border-primary rounded-2xl hover:bg-transparent hover:text-primary transition duration-300 flex items-center gap-3 cursor-pointer">
        Get started <FaArrowRight size={20} />
      </button>
    </div>
  );
};

export default Hero;
