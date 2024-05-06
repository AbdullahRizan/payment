import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ActivityForm = () => {

    const empty = {
        description: "",
        duration:"",
        date:"",
        trainerType:"",
        activityType:"",
        amount:""
      };
      const [sessionEmail, setsessionEmail] = useState(null);
      const getSessionEmail = () => {
        setsessionEmail(sessionStorage.getItem("useremail"));
      };
      useEffect(()=>{
        getSessionEmail();
      },[]);
    const navigate=useNavigate();
    const [addActivity, setAddActivity]=useState(empty);
    
    const handleClick=(event)=>{
        const {name, value}= event.target;
        setAddActivity({...addActivity, [name]:value, email: sessionEmail})
    }

  const addActivityBtn = async () => {
    if(addActivity.description=="" || addActivity.activityType=="" || addActivity.duration=="" || addActivity.date=="" || addActivity.trainerType=="" || addActivity.amount==""){
        alert("please Enter Data in All fields!")
    }
    else{
      await fetch("http://127.0.0.1:4000/activitypost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addActivity),
      });
        alert("Activity added");
        setAddActivity(empty);
        navigate("/dashboard/activities")
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-gray-900 text-white bg-dark flex justify-center items-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="form p-5 space-y-4 sm:w-1/2 w-4/12 bg-opacity-50 rounded-2xl border-red-800"
        >
          <h2 className="text-center text-3xl font-bold">Add Member</h2>
          <input
            className="border-b-2 border-red-800 w-full bg-transparent text-white h-10"
            type="text"
            name="description"
            placeholder="Name"
            onChange={handleClick}
            value={addActivity.description}
          />

          <input
            className="border-b-2 border-red-800 w-full bg-transparent text-white h-10"
            type="number"
            name="duration"
            min="1"
            placeholder="Phone no"
            onChange={handleClick}
            value={addActivity.duration}
          />
          <input
            className="border-b-2 border-red-800 w-full bg-transparent text-white h-10"
            type="date"
            name="date"
            onChange={handleClick}
            value={addActivity.date}
          />

          <select
            className="border-b-2 border-red-800 w-full bg-transparent bg-dark text-white h-10"
            name="trainerType"
            onChange={handleClick}
            value={addActivity.trainerType}
          >
             <option className="text-gray-300 text-white bg-dark">Trainer</option>
              <option className="text-white bg-dark">Robin</option>
              <option className="text-white bg-dark">Tom</option>

          </select>


          <select
            className="border-b-2 border-red-800 w-full bg-transparent bg-dark text-white h-10"
            name="activityType"
            onChange={handleClick}
            value={addActivity.activityType}
          >
             <option className="text-gray-300 text-white bg-dark">Membership Package</option>
              <option className="text-white bg-dark">Monthly</option>
              <option className="text-white bg-dark">Annual</option>

          </select>
          <input
            className="border-b-2 border-red-800 w-full bg-transparent text-white h-10"
            type="number"
            name="amount"
            min="1"
            placeholder="Amount"
            onChange={handleClick}
            value={addActivity.amount}
          />

          <div className="flex justify-center mt-5">
            <button
              className="bg-red-800 bg-dark text-white p-3 rounded-full font-bold hover:bg-black"
              onClick={addActivityBtn}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );



};

export default ActivityForm;
