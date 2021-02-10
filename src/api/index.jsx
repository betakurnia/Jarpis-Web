import axios from "axios";

import proxy from "../utils/proxy";

export const viewExams = async (id) => {
  try {
    const response = await axios.get(`${proxy}/api/exams/view-exam/${id}`);

    return response.data;
  } catch (e) {
    console.log(e.response.data);
  }
};

export const viewTheorys = async (id) => {
  try {
    const response = await axios.get(`${proxy}/api/theorys/view/${id}`);

    return response.data;
  } catch (e) {
    console.log(e.response.data);
  }
};

export const deleteExam = async (id, type) => {
  try {
    const response = await axios.post(
      `${proxy}/api/exams/delete/${id}/${type}`
    );

    return response.data;
  } catch (e) {
    console.log(e.response.data);
  }
};

export const addAnnouncement = async (history, announcementData) => {
  try {
    await axios.post(`${proxy}/api/announcement/create`, announcementData);
    history.push("/pengumuman");
    return { errors: {} };
  } catch (err) {
    return { errors: err.response.data };
  }
};

export const updateAnnouncement = async (history, id, announcementData) => {
  try {
    await axios.post(
      `${proxy}/api/announcement/update/${id}`,
      announcementData
    );
    history.push("/pengumuman");
    return { errors: {} };
  } catch (err) {
    return { errors: err.response.data };
  }
};

export const viewAnnouncementById = async (id) => {
  try {
    const response = await axios.get(`${proxy}/api/announcement/view/${id}`);

    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const viewAnnouncements = async () => {
  try {
    const response = await axios.get(`${proxy}/api/announcement/view`);

    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const viewMajorsStudent = async (kelasId) => {
  try {
    const response = await axios.get(
      `${proxy}/api/majors/view?kelasId=${kelasId}`
    );

    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const viewMajorsTeacher = async (majorId) => {
  try {
    const response = await axios.post(
      `${proxy}/api/majors/viewByArray`,
      majorId
    );

    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const viewMajorsAdmin = async () => {
  try {
    const response = await axios.get(`${proxy}/api/majors/view`);

    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const createExam = async (exams) => {
  try {
    await axios.post(`${proxy}/api/exams/create?types=${exams.type}`, exams);
    window.location.href = "/dashboard";
  } catch (err) {
    console.log(err.response.data);
  }
};

export const createExamStudent = async (exams) => {
  try {
    await axios.post(`${proxy}/api/exams/create/user`, exams);
    window.location.href = "/dashboard";
  } catch (err) {
    console.log(err.response.data);
  }
};

export const viewExamByIdAndType = async (id, ujian) => {
  try {
    const response = await axios.get(
      `${proxy}/api/exams/view/${id}?type=${ujian}`
    );

    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const viewExamByIdUserIdAndType = async (id, userId, ujian) => {
  try {
    await axios.get(`${proxy}/api/exams/view/${id}/${userId}?type=${ujian}`);
  } catch (err) {
    console.log(err.response.data);
  }
};

export const viewMajors = async (id) => {
  try {
    const response = await axios.get(`${proxy}/api/majors/view/${id}`);

    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const viewUsers = async () => {
  try {
    const response = await axios.get(`${proxy}/api/users/view`);

    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const viewRecapitulations = async (id) => {
  try {
    const response = await axios.get(
      `${proxy}/api/exams/view/recapitulations/${id}`
    );

    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const viewRecapitulationsByIdAndType = async (id, ujian) => {
  try {
    const response = await axios.get(
      `${proxy}/api/exams/view/recapitulation/${id}?type=${ujian}`
    );

    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const deleteAnnouncementById = async (id) => {
  try {
    const response = await axios.post(`${proxy}/api/announcement/delete/${id}`);

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
