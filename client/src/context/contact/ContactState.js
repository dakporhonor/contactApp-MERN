import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // GET CONTACTS
  const getContacts = async () => {
    try {
      const response = await axios.get("/api/contacts");
      dispatch({
        type: GET_CONTACTS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      });
    }
  };
  //   ADD_CONTACT,
  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const response = await axios.post("/api/contacts", contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      });
    }
  };

  // CLEAR CONTACTS
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    });
  };
  //   DELETE_CONTACT,
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data.msg
      });
    }
  };

  //   UPDATE_CONTACT,
  const updateContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const response = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: UPDATE_CONTACT,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      });
    }
  };
  //   SET_CURRENT CONTACT,
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };
  //   CLEAR_CURRENT CONTACT,
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  //   FILTER_CONTACTS,
  const filterContact = text => {
    dispatch({
      type: FILTER_CONTACT,
      payload: text
    });
  };
  //   CLEAR_FILTER
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        loading: state.loading,
        error: state.error,
        getContacts,
        addContact,
        clearContacts,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContact,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
