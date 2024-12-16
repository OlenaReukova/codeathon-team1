import NavBar from "../(home)/_components/navbar";
import Footer from "../(home)/_components/footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex justify-center items-center">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
