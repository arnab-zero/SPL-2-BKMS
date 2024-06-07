const SubmitPaper = () => {
  return (
    <div className="grid grid-cols-4 my-10">
      <div className="col-start-2 col-end-4 flex flex-col">
        <h1 className="text-3xl font-bold py-4 text-center">Add Your Paper Into the Graph</h1>

        <form action="" className="">
          <label htmlFor="topic" className="text-lg font-medium leading-10">
            Choose Topic{" "}
          </label>
          <br />
          <input
            type="text"
            name="topic"
            id="topic"
            className="border-2 mb-4 w-full rounded-xl pl-4 py-4"
            placeholder="Topic"
            required
          />
          <br />
          <label htmlFor="title" className="text-lg font-medium leading-10">
            Paper Title{" "}
          </label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            className="border-2 mb-4 w-full rounded-xl pl-4 py-4"
            placeholder="Paper Title"
            required
          />
          <br />
          <label htmlFor="author" className="text-lg font-medium leading-10">
            Author(s) Name{" "}
          </label>
          <br />
          <input
            type="text"
            name="author"
            id="author-name"
            className="border-2 mb-4 w-full rounded-xl pl-4 py-4"
            placeholder="Author(s) Name"
            required
          />
          <br />
          <label htmlFor="link" className="text-lg font-medium leading-10">
            Paper Link{" "}
          </label>
          <br />
          <input
            type="text"
            name="link"
            id="link"
            className="border-2 mb-4 w-full rounded-xl pl-4 py-4"
            placeholder="Paper Link"
            required
          />
          <br />
          <label
            htmlFor="publication-date"
            className="text-lg font-medium leading-10"
          >
            Publication Date{" "}
          </label>
          <br />
          <input
            type="date"
            name="publication-date"
            id="publication-date"
            className="border-2 mb-4 w-full rounded-xl pl-4 py-4"
            placeholder="Publication Date"
            required
          />
          <br />
          <label htmlFor="abstract" className="text-lg font-medium leading-10">
            Abstract{" "}
          </label>
          <br />
          {/* <input
    type="text"
    name="abstract"
    id="abstract"
    className="border-2 mb-4 w-full rounded-xl pl-4 py-4"
    placeholder="Abstract"
    required
  /> */}
          <textarea
            className="resize-y block w-full px-4 py-4 mt-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Paper abstract"
          ></textarea>
          <br />
          <div className="flex justify-center">
            <input
              type="submit"
              value="Submit Paper"
              className="border-2 bg-[#ecb78c] px-5 py-2 rounded-xl hover:bg-[#c1793f] hover:border-[#dc833b] text-black font-semibold"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitPaper;
