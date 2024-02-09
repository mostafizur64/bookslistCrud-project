import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddItem = () => {
  const [bookList, setBookList] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const author = form.author.value;
    const price = form.price.value;
    const year = form.year.value;

    const data = {
      id: uuidv4(),
      name,
      author,
      price,
      year,
    };

  
    const existingBookList = JSON.parse(localStorage.getItem("bookList")) || [];
    const updatedBookList = [...existingBookList, data];
    localStorage.setItem("bookList", JSON.stringify(updatedBookList));

   
    setBookList(updatedBookList);

   
    form.reset();
    navigate("/");
  };

  return (
    <div>
      <div>
        <div
          className="bg-[#fff] md:text-[20px] text-[16px] md:px-24 px-4 rounded-lg
          text-center shadow-lg "
        >
          <div className="md:px-[240px] py-12">
            <div>
              <h2 className="md:text-[40px] text-[30px] font-bold">
                Create Book List
              </h2>
              <p className="text-paragraphColor md:mt-4 mt-2 md:text-[24px] text-[16px]">
                Create your Favourite book
              </p>
            </div>
            {/* form start ========== */}
            <div className="md:mt-12 mt-4 text-[#898989]">
              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  type="text"
                  placeholder="Book Name"
                  className="border-b-2 border-[#E1E1E1] py-6 focus:border-[#0052CC] outline-none w-full"
                />

                <input
                  name="author"
                  type="text"
                  placeholder="Author Name"
                  className="border-b-2 border-[#E1E1E1] py-6 focus:border-[#0052CC] outline-none w-full"
                />
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="border-b-2 border-[#E1E1E1] py-6 focus:border-[#0052CC] outline-none w-full"
                />
                <input
                  name="year"
                  type="number"
                  placeholder="Year"
                  className="border-b-2 border-[#E1E1E1] py-6 focus:border-[#0052CC] outline-none w-full"
                />

                <button
                  type="submit"
                  className="bg-[#0052CC] w-full text-[20px] md:mt-6 text-[#FFF] md:py-6 py-3 rounded-lg"
                >
                  Create Book
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
