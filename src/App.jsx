import React, { useState } from "react";

function App() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [areaofinterest, setAreaOfInterest] = useState("");
  const [jobs, setJobs] = useState("");
  const [purpose, setPurpose] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/; // Ensures only 10-digit numbers
    return phonePattern.test(phone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format!";
    }
    if (!validatePhone(phone)) {
      validationErrors.phone = "Phone number must be exactly 10 digits!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Sending data to the backend
      try {
        const response = await fetch("http://localhost:5000/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            email, // Recipient's email
            phone,
            education,
            areaofinterest,
            jobs,
            purpose,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Email sent successfully!");
        } else {
          alert("Error sending email: " + data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to send email. Please try again.");
      }

      try {
        const response = await fetch("http://localhost/store_db/store_data.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            phone,
            education,
            areaofinterest,
            jobs,
            purpose,
          }),
        });

        const data = await response.json();
        if (data.success) {
          alert("Data stored successfully in MySQL!");
        } else {
          alert("Error storing data: " + data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to store data. Please try again.");
      }
    }
  };

  return (
    <div className="containers">
      <h1>Welcome to NEXTHUB</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <br />

        <label>
          Last Name:
          <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </label>
        <br />

        <label>
          Phone Number:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
        </label>
        <br />

        <label>
          Education:
          <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} required />
        </label>
        <br />

        <label>
          Area of Interest:
          <input type="text" value={areaofinterest} onChange={(e) => setAreaOfInterest(e.target.value)} required />
        </label>
        <br />

        <label>
          Jobs Search For:
          <input type="text" value={jobs} onChange={(e) => setJobs(e.target.value)} required />
        </label>
        <br />

        <label>
          What is the purpose of using NextHub?
          <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} required />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;