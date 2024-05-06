import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const ActivityRecord = () => {
  const empty = {
    description: "",
    duration: "",
    date: "",
    trainerType: "",
    activityType: "",
    amount: ""
  };

  const [data, setData] = useState([]);
  const [editBoxshow, setEditBoxShow] = useState(false);
  const [editActivityState, setEditActivityState] = useState(empty);
  const [idget, setIdget] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleClick = (event) => {
    const { name, value } = event.target;
    setEditActivityState({ ...editActivityState, [name]: value });
  };

  const dataFetch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/activityget`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const dataFetch = await response.json();
      setData(dataFetch);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const deleteActivity = async (id) => {
    await fetch(`http://127.0.0.1:4000/activityget/${id}`, {
      method: "DELETE",
    });
    dataFetch();
  };

  const editActivity = async (id) => {
    let dataGet = await fetch(`http://127.0.0.1:4000/activityget/${id}`);
    dataGet = await dataGet.json();
    setEditActivityState(dataGet);
    setIdget(id);
    setEditBoxShow(true);
  };

  const updateActivityBtn = async () => {
    let idtoUpdate = idget;
    await fetch(`http://127.0.0.1:4000/activityedit/${idtoUpdate}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editActivityState),
    });
    dataFetch();
    setEditActivityState(empty);
    setEditBoxShow(false);
  };

  const generateReport = () => {
    // Calculate total amount
    const total = data.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    setTotalAmount(total);
  
    const doc = new jsPDF();
    let yPos = 10;
    let memberNo = 1; // Initialize member number
  
    // Add total amount as header
    doc.setFontSize(18);
    doc.text(`Total Amount: ${total}`, 10, yPos);
    yPos += 20;
  
    // Add members' names and numbers
    data.forEach((elem) => {
      // Add member number and name
      doc.text(`Member ${memberNo}: ${elem.description}`, 10, yPos);
      // Add amount
      doc.text(`Amount: ${elem.amount}`, 100, yPos);
      yPos += 10;
      memberNo++; // Increment member number
    });
  
    // Save the PDF
    doc.save("activity_report.pdf");
  };
    
  return (
    <>
      <div className="row m-auto mt-5 text-white bg-dark">
        {data.length === 0 ? (
          <div className="text-Primary flex items-center justify-center text-3xl">
            No membership records available
          </div>
        ) : (
          data.map((elem) => (
            <div className="col-4" key={elem._id}>
              <div className="cardA mt-3">
                <div className="cardA__content">
                  <h1>Membership:</h1>
                  <div className="cardA__content-heading mt-3">
                    <p>{elem.activityType}</p>
                  </div>
                  <div className="cardA__content-body">
                    <h3>Name:</h3><p>{elem.description}</p>
                    <h3>Phone No:</h3><p>{elem.duration} </p> 
                    <h3>Registered Date:</h3><p>{elem.date}</p>
                    <h3>Trainer:</h3><p>{elem.trainerType}</p>
                    <h3>Amount:</h3><p>{elem.amount}</p>
                  </div>
                  <div className="cardA__content-footer m-auto">
                    <button onClick={() => editActivity(elem._id)} className="btnA"> Edit
                    </button>
                    <button className="btnA" onClick={() => deleteActivity(elem._id)}> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <button onClick={() => {generateReport(); setEditBoxShow(!editBoxshow);}}>Generate Report</button>
      </div>
      {editBoxshow && (
        <div className="bg-dark text-white">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-red-800 p-2 space-y-4 sm:w-1/2 w-4/12 absolute lg:left-1/4 lg:top-1/4 sm:left-1/3 sm:top-1/4 top-1/4 left-1/3 text-white"
          >
            <h2 className="text-center sm:text-3xl text-xl">Edit Membership</h2>
            <input
              className="border border-white w-full p-0.5"
              type="text"
              name="description"
              placeholder="Description"
              onChange={handleClick}
              value={editActivityState.description}
            />
            <input
              className="border border-white w-full p-0.5"
              type="number"
              name="duration"
              placeholder="Phone no"
              onChange={handleClick}
              value={editActivityState.duration}
            />
            <input
              className="border border-white w-full p-0.5"
              type="date"
              name="date"
              onChange={handleClick}
              value={editActivityState.date}
            />

            <select
              className="border border-white w-full p-0.5"
              name="trainerType"
              onChange={handleClick}
              value={editActivityState.trainerType}
            >
              <option className="text-gray-300 text-white bg-dark">Trainer</option>
              <option className="text-white bg-dark">Robin</option>
              <option className="text-white bg-dark">Tom</option>

          </select>


            <select
              className="border border-white w-full p-0.5"
              name="activityType"
              onChange={handleClick}
              value={editActivityState.activityType}
            >
              <option className="text-gray-300 text-white bg-dark">Membership Package</option>
              <option className="text-white bg-dark">Monthly</option>
              <option className="text-white bg-dark">Annual</option>
            </select>
            <input
              className="border border-white w-full p-0.5"
              type="number"
              name="amount"
              placeholder="Amount"
              onChange={handleClick}
              value={editActivityState.amount}
            />

            <div className="flex justify-center mt-3">
              <button
                className="bg-white p-3 rounded-full text-red-800 font-bold hover:bg-black"
                onClick={updateActivityBtn}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}


     

    </>
  );
};

export default ActivityRecord;


  



