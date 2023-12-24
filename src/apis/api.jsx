import axiosInstance from './http';

export const getQuestions = async () => {
  return axiosInstance.get('/api/question');
};

export const getTest = async () => {
  return axiosInstance.get('/api/test');
};

export const apiDownloadExamPdf = async (testId) => {
  return axiosInstance.get(`/api/test/${testId}/download`, {
    responseType: 'blob',
  });
};
