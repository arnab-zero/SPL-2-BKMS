import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Root = () => {
  return (
    <div className="bg-[#faf6f3]">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Root;
