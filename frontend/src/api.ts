import axios from 'axios';
import { SearchRes } from './types';

const apiUrl = 'placeholder';

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
