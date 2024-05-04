import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Root = () => {
  return (
    <div>
      <div className="sticky top-0">
        <Header />
      </div>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Root;
