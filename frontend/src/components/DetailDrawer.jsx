import { FaLongArrowAltUp } from "react-icons/fa";
import PaperDetail from "./PaperDetail";

const DetailDrawer = ({ nodeDetails }) => {

  console.log("From DetailDrawer:", nodeDetails)

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn transfrom -rotate-90 relative z-30 left-[98%] top-[20%] text-lg bg-[#f0b98c] border-none"
          >
            <FaLongArrowAltUp className="text-lg" />
          </label>
        </div>
        <div className="drawer-side top-14 z-30">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-[400px] min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <PaperDetail nodeDetails={nodeDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDrawer;
