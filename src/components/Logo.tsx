import MyLogo from "../../public/logo.png";

const Logo = () => {
  return (
    <div className="text-lightBlue text-2xl font-bold tracking-wide">
      <img src={MyLogo} alt="Blogger" width={100} height={100} />
    </div>
  );
};

export default Logo;
