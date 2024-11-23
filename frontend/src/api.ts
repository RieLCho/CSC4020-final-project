import axios from 'axios';
import { SearchRes } from './types';

const apiUrl = 'http://localhost:3000';

export const PostBlueArchiveSearch = async (
  query: string,
  page: number = 1,
  size: number = 9
): Promise<SearchRes> => {
  try {
    const response = await axios.post<SearchRes>(
      `${apiUrl}/blue_archive/search`,
      {
        query,
        page,
        size,
      },
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      'Error in fetchFrames:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getBlueArchiveUid = async (uid: string) => {
  try {
    const response = await axios.get(`${apiUrl}/blue_archive/${uid}`, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      'Error in getBlueArchiveUid:',
      error.response?.data || error.message
    );
    if (error.response && error.response.status === 422) {
      return {
        detail: error.response.data.detail,
      };
    }
    throw error;
  }
};

export const getStudentsList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/students`, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      'Error in getStudentsList:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getStudentDialogues = async (
  name: string,
  page: number = 1,
  size: number = 9
) => {
  try {
    const response = await axios.get(`${apiUrl}/students/detail`, {
      params: { name, page, size },
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      'Error in getStudentDialogues:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postLogin = async (id: string, pw: string) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, { id, pw });
    return response.data;
  } catch (error: any) {
    console.error('Error in login:', error.response?.data || error.message);
    throw error;
  }
};
