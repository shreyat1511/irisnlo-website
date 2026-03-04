import React from "react";
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <h2 className="text-center mb-2">Contact Us</h2>
          <p className="text-center text-muted mb-4">We'd love to hear from you! Fill out the form below.</p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Contact;