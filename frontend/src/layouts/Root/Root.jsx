import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf6f3]">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Root;
