import Interests from "./Interests";
import Profile from "./Profile";
import Settings from "./Settings";
import { useState } from "react";

export default TabForm = () => {
  const [data, setData] = useState({
    name: "Akhil",
    age: "18",
    email: "akhil@gmail.com",
    interests: ["coding", "music"],
    theme: "dark",
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if (!data.name || data.name.length < 2) {
          err.name = "Name is not valid";
        }
        if (!data.name || data.age < 18) {
          err.age = "Age is not valid";
        }
        if (!data.email || data.email.length < 2) {
          err.email = "Email is not valid";
        }

        setErrors(err);
        return err.name || err.age || err.email ? false : true;
      },
    },
    {
      name: "Interests",
      component: Interests,
      validate: () => {
        const err = {};
        if (data.interests.length < 1) {
          err.interests = "Select Atleast One Interest";
        }
        setErrors(err);
        return err.interests ? false : true;
      },
    },
    {
      name: "Settings",
      component: Settings,
      validate: () => {
        return true;
      },
    },
  ];
  const ActiveTabComponent = tabs[activeTab].component;

  const handleNextClick = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev + 1);
    }
  };
  const handlePrevClick = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev - 1);
    }
  };
  const handleSubmitClick = () => {
    // Make API Call
    console.log(data);
  };

  return (
    <div>
      <div className="heading-container">
        {tabs.map((t, index) => (
          <div
            key={index}
            className="heading"
            onClick={() => tabs[activeTab].validate() && setActiveTab(index)}
          >
            {t.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent data={data} setData={setData} errors={errors} />
      </div>
      <div>
        {activeTab > 0 && <button onClick={handlePrevClick}>Prev</button>}
        {activeTab < tabs.length - 1 && (
          <button onClick={handleNextClick}>Next</button>
        )}
        {activeTab === tabs.length - 1 && (
          <button onClick={handleSubmitClick}>Submit</button>
        )}
      </div>
    </div>
  );
};
