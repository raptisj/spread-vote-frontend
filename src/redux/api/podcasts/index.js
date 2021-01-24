import axios from "axios"
import { tokenConfig } from '../../slices/auth'
import { URL } from '../../../constants'

export const podcastAPI = {
  async fetchAll() {
    const res = await axios.get(`${URL}/podcasts/`);
    return res
  },
  async fetchOne(id) {
    const res = await axios.get(`${URL}/podcasts/${id}`);
    return res
  },
  async voteOne(userData, podId, getState) {
    const res = await axios.patch(`${URL}/podcasts/${podId}/vote-category`, userData, tokenConfig(getState));
    return res
  },
};
