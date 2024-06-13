import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div>
      <div className="bg-[#191d4b] text-white py-8">
        <h3 className="text-center text-2xl font-bold py-4">
          © Arnab Das Joy & Md. Sabbir Hosen
        </h3>
        <h5 className="text-center text-xl font-semibold">
          For any queries, contact us.
        </h5>
        <div className="flex gap-2 items-center flex justify-center">
          <MdOutlineEmail />{" "}
          <span className="text-lg font-medium">bsse1308@iit.du.ac.bd</span>
        </div>
        <div className="flex gap-2 items-center flex justify-center">
          <MdOutlineEmail />
          <span className="text-lg font-medium">bsse1333@iit.du.ac.bd</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
