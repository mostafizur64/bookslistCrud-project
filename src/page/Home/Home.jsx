import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [storedBookList, setStoredBookList] = useState(
    JSON.parse(localStorage.getItem("bookList")) || []
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterPriceRange, setFilterPriceRange] = useState("");

  const handleDeleteSingle = (id) => {
    const updatedList = storedBookList.filter((item) => item.id !== id);
    localStorage.setItem("bookList", JSON.stringify(updatedList));
    setStoredBookList(updatedList);
  };

  const handleDeleteMultiple = () => {
    const updatedList = storedBookList.filter(
      (item) => !selectedItems.includes(item.id)
    );
    localStorage.setItem("bookList", JSON.stringify(updatedList));
    setStoredBookList(updatedList);
    setSelectedItems([]);
  };

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handlePriceRangeFilter = (e) => {
    setFilterPriceRange(e.target.value);
  };

  const filteredList = storedBookList.filter((item) => {
    if (!filterPriceRange) return true;
    const price = parseFloat(item.price);
    switch (filterPriceRange) {
      case "under10":
        return price < 10;
      case "10to50":
        return price >= 10 && price <= 50;
      case "over50":
        return price > 50;
      default:
        return true;
    }
  });

  return (
    <>
      <div className="bg-white text-black mx-auto h-full py-12 shadow-2xl border border-blue-600 rounded-md px-8">
        <div className="flex items-center justify-between">
          <span className="text-[40px]">Books</span>
          <Link to="/addItem">
            <button className="text-white bg-black text-xl p-2 rounded-md">
              Create New
            </button>
          </Link>
        </div>
        <div className="flex items-center mt-4">
          <label htmlFor="priceRangeFilter">Filter by Price Range:</label>
          <select
            id="priceRangeFilter"
            name="priceRangeFilter"
            className="ml-2 p-2 rounded-md"
            onChange={handlePriceRangeFilter}
            value={filterPriceRange}
          >
            <option value="">All</option>
            <option value="under10">Under $10</option>
            <option value="10to50">$10 to $50</option>
            <option value="over50">Over $50</option>
          </select>
        </div>
        <div className="mt-12">
          <div className="overflow-x-auto border">
            <table className="w-full ">
              <thead className="bg-[#E6E6E6] text-left text-[16px] text-[#000000] w-full">
                <tr>
                  <th className="px-2 py-2">#</th>
                  <th className="px-2 py-2 ">Name</th>
                  <th className="px-2 py-2">Author</th>
                  <th className="px-2 py-2">Price</th>
                  <th className="px-2 py-2">Year</th>
                  <th className="px-2 py-2">Action</th>
                  <th className="px-2 py-2">Mark</th>
                </tr>
              </thead>
              <tbody className="text-[18px] text-[#495057] w-full text-start">
                {filteredList.map((item, index) => (
                  <tr key={index} className="">
                    <td className="border-b py-2 px-2">{index + 1}</td>
                    <td className="border-b py-2 px-2">{item.name}</td>
                    <td className="border-b py-2 px-2">{item.author}</td>
                    <td className="border-b py-2 px-2">${item.price}</td>
                    <td className="border-b py-2 px-2">{item.year}</td>
                    <td className="border-b py-2 px-2 flex items-center gap-2">
                      <Link to={`/editItem/${item.id}`}>
                        <button className="bg-black text-white p-2 rounded-md">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="bg-black text-white p-2 rounded-md"
                        onClick={() => handleDeleteSingle(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="border-b py-2 px-2">
                      <input
                        type="checkbox"
                        id="check"
                        name="check"
                        className="w-[24px] h-[28px]"
                        onChange={() => handleCheckboxChange(item.id)}
                        checked={selectedItems.includes(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="bg-black text-white p-2 rounded-md flex items-end justify-end mt-4"
          onClick={handleDeleteMultiple}
        >
          Delete Selected
        </button>
      </div>
    </>
  );
};

export default Home;
