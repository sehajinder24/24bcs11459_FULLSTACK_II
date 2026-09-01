import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); 
    navigate("/"); 
  };

  return (
    <div>
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
