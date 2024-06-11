import { PiDotsThreeCircleLight } from "react-icons/pi";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const Answer = () => {
  return (
    <div className="bg-[#e8e4de] w-[70%] px-5 py-3 rounded-2xl mx-5 mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-4 items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZBaQWmklNwzgXRyLEDIB9n6lzOEq-fkowNA&s"
            alt=""
            className="rounded-full w-10 h-10"
          />
          <h1 className="text-lg font-medium text-[#7b5229c2]">Username</h1>
        </div>
        <PiDotsThreeCircleLight className="text-2xl" />
      </div>
      <div className="text-justify">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore sit,
        optio, sed, numquam enim tenetur quod id deserunt consectetur rem ut
        blanditiis similique accusamus corporis aspernatur. Numquam laudantium
        atque enim voluptatum, non quidem culpa, assumenda repudiandae incidunt
        laboriosam dolore perferendis iure accusamus beatae dicta rem excepturi,
        placeat adipisci autem sunt voluptatem quasi rerum! Nemo ex ipsa veniam
        deserunt! Quam suscipit culpa omnis hic dolor ad quaerat consequatur
        repellat quasi aspernatur dignissimos rem tempora deserunt, eligendi
        rerum inventore pariatur quas, ullam sunt. Inventore veniam eius nemo
        delectus tempora obcaecati laudantium dolor recusandae dolorum.
        Consequatur repudiandae doloremque veritatis accusantium voluptatibus,
        quas non?
      </div>
      <div className="mt-3 flex justify-between items-center">
        <h3 className="text-sm font-light text-gray-600">Timestamp</h3>
        <div className="flex gap-2 items-center">
          <BiUpvote className="text-xl hover:text-white hover:bg-[#f2c35f] hover:rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f2c35f] duration-300" />
          <BiDownvote className="text-xl hover:text-white hover:bg-[#f2c35f] hover:rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f2c35f] duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Answer;
