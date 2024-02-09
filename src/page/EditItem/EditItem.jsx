import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: "",
    year: "",
  });

  useEffect(() => {
    const storedBookList = JSON.parse(localStorage.getItem("bookList")) || [];
    const selectedBook = storedBookList.find((book) => book.id === id);

    if (selectedBook) {
      setFormData({
        name: selectedBook.name,
        author: selectedBook.author,
        price: selectedBook.price,
        year: selectedBook.year,
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedBookList = JSON.parse(localStorage.getItem("bookList")) || [];
    const updatedBookList = storedBookList.map((book) =>
      book.id === id ? { ...book, ...formData } : book
    );
    localStorage.setItem("bookList", JSON.stringify(updatedBookList));

    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="bg-[#fff] md:text-[20px] text-[16px] md:px-24 px-4 rounded-lg text-center shadow-lg">
        <div className="md:px-[240px] py-12">
          <div>
            <h2 className="md:text-[40px] text-[30px] font-bold">
              Edit Book List
            </h2>
            <p className="text-paragraphColor md:mt-4 mt-2 md:text-[24px] text-[16px]">
              Edit your Favorite book
            </p>
          </div>
          <div className="md:mt-12 mt-4 text-[#898989]">
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Book Name"
                className="border-b-2 border-[#E1E1E1] py-6 focus:border-[#0052CC] outline-none w-full"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                name="author"
                type="text"
                placeholder="Author Name"
                className="border-b-2 border-[#E1E1E1] py-6 focus:border-[#0052CC] outline-none w-full"
                value={formData.author}
                onChange={handleChange}
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                className="border-b-2 border-[#E1E1E1] py-6 focus:border-[#0052CC] outline-none w-full"
                value={formData.price}
                onChange={handleChange}
              />
              <input
                name="year"
                type="number"
                placeholder="Year"
                className="border-b-2 border-[#E1E1E1] py-6 focus:border-[#0052CC] outline-none w-full"
                value={formData.year}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="bg-[#0052CC] w-full text-[20px] md:mt-6 text-[#FFF] md:py-6 py-3 rounded-lg"
              >
                Edit Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
