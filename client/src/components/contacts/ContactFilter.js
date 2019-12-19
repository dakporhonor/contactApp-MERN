import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const text = useRef("");
  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilter, filtered } = contactContext;
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });
  const onChange = e => {
    if (text.current.value !== "") {
      return filterContact(e.target.value);
    }
    clearFilter();
  };
  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
