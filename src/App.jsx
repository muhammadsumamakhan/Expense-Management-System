import React, { useRef, useState } from 'react'


const App = () => {
  const amount = useRef();
  const transactionType = useRef();
  const categoryIn = useRef();
  const categoryOut = useRef();
  const description = useRef();

  const [historyData, setHistoryData] = useState([]);
  const [cashIn, setCashIn] = useState(0);
  const [cashOut, setCashOut] = useState(0);
  const [balance, setBalance] = useState(0);

  const addTransaction = (e) => {
    e.preventDefault();
    // Get form values
    const userAmount = parseFloat(amount.current.value);
    const userTransactionType = transactionType.current.value;
    const userCategoryIn = categoryIn.current.value;
    const userCategoryOut = categoryOut.current.value;
    const userDescription = description.current.value;

    // Log transaction details
    console.log("User Amount is: " + userAmount);
    console.log("Transaction Type is: " + userTransactionType);
    console.log("Category is Cash In: " + userCategoryIn);
    console.log("Category is Cash Out: " + userCategoryOut);
    console.log("Description is: " + userDescription);

    // Basic validation
    if (!userAmount || !userTransactionType || (!userCategoryIn && !userCategoryOut) || !userDescription) {
      alert("Please fill in all fields.");
      return;
    }

    // Update state based on transaction type
    if (userTransactionType === "cash in") {
      setCashIn((prevCashIn) => prevCashIn + userAmount);
      setBalance((prevBalance) => prevBalance + userAmount);
    } else if (userTransactionType.toLowerCase() === "cash out") {
      setCashOut((prevCashOut) => prevCashOut + userAmount);
      setBalance((prevBalance) => prevBalance - userAmount);
    }

    // Update history data
    setHistoryData((prevHistory) => [
      ...prevHistory,
      {
        userAmount,
        userTransactionType,
        userCategoryIn,
        userCategoryOut,
        userDescription,
        date: new Date().toLocaleDateString(),
      },
    ]);

    // Clear input fields
    amount.current.value = '';
    transactionType.current.value = '';
    categoryIn.current.value = '';
    categoryOut.current.value = '';
    description.current.value = '';
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Menu Header */}
        <header className="bg-blue-600 text-white p-6 shadow-lg rounded-md text-center">
          <h1 className="text-3xl font-bold tracking-wide">Expense Management System</h1>
        </header>

        {/* Form Section */}
        <section className="bg-white mt-10 p-6 rounded-md shadow-lg max-w-3xl mx-auto">
          {/* Financial Summary Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-0 max-w-3xl mx-auto">
            <div className="bg-green-500 text-white p-6 rounded-md shadow-lg">
              <h2 className="text-xl font-semibold">Cash In</h2>
              <p className="text-4xl font-bold mt-2">{cashIn}</p>
            </div>
            <div className="bg-red-500 text-white p-6 rounded-md shadow-lg">
              <h2 className="text-xl font-semibold">Cash Out</h2>
              <p className="text-4xl font-bold mt-2">{cashOut}</p>
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-md shadow-lg">
              <h2 className="text-xl font-semibold">Balance</h2>
              <p className="text-4xl font-bold mt-2">{balance}</p>
            </div>
          </section>

          <form onSubmit={addTransaction}>
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8 tracking-tight">
              Transaction Tracker
            </h1>

            {/* Amount */}
            <div className="mb-6">
              <label htmlFor="Amount" className="block text-gray-700 font-medium mb-2">
                Amount:
              </label>
              <input
                type="number"
                id="Amount"
                ref={amount}
                placeholder="Enter your amount"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            {/* Transaction Type */}
            <div className="mb-6">
              <label htmlFor="transactionType" className="block text-gray-700 font-medium mb-2">
                Transaction Type:
              </label>
              <select
                id="transactionType"
                ref={transactionType}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white focus:ring focus:ring-blue-300 focus:outline-none"
              >
                <option value="" disabled selected>
                  Select Transaction Type
                </option>
                <option value="cash in">Cash In</option>
                <option value="cash out">Cash Out</option>
              </select>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cash In Category */}
              <div>
                <label htmlFor="categoryIn" className="block text-gray-700 font-medium mb-2">
                  Category (Cash In):
                </label>
                <select
                  id="categoryIn"
                  ref={categoryIn}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white focus:ring focus:ring-blue-300 focus:outline-none"
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  <option value="salary">Salary</option>
                  <option value="business">Business</option>
                  <option value="loan">Loan</option>
                  <option value="rent">Rent</option>
                  <option value="investment">Investment</option>
                </select>
              </div>

              {/* Cash Out Category */}
              <div>
                <label htmlFor="categoryOut" className="block text-gray-700 font-medium mb-2">
                  Category (Cash Out):
                </label>
                <select
                  id="categoryOut"
                  ref={categoryOut}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white focus:ring focus:ring-blue-300 focus:outline-none"
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  <option value="groceries">Groceries</option>
                  <option value="fuel">Fuel</option>
                  <option value="food/drink">Food/Drink</option>
                  <option value="clothes">Clothes</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description:
              </label>
              <textarea
                id="description"
                ref={description}
                placeholder="Enter a brief description..."
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                rows="4"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              Add Transaction
            </button>
          </form>

          {/* Transaction History */}
          <section>
            <h1 className="text-3xl mt-5 font-extrabold text-gray-900 text-center mb-8 tracking-tight">
              Transaction History
            </h1>

            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-4">Transaction Type</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {historyData.length > 0 ? (
                  historyData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-gray-800">{item.userTransactionType}</td>
                      <td className="px-6 py-4 text-gray-800">{item.userCategoryIn || item.userCategoryOut}</td>
                      <td className="px-6 py-4 text-gray-800">{item.userDescription}</td>
                      <td className="px-6 py-4 text-gray-800">{item.userAmount}</td>
                      <td className="px-6 py-4 text-gray-800">{new Date().toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-800">
                      No transactions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </>
  );
};

export default App;
