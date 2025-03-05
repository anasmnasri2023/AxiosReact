import axios from "axios";

const url = "http://localhost:3001/events";

export const getallEvents = async (id = "") => {
  return await axios.get(`${url}/${id}`);
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const addEvent = async (event) => {
  return await axios.post(url, event);
};

export const editEvent = async (id, event) => {
  return await axios.put(`${url}/${id}`, event);
};

export const deleteEvent = async (id) => {
  return await axios.delete(`${url}/${id}`);
};
