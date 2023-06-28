import { AxiosResponse } from "axios";
import axios from "../config/axios.config";
import { Streamer, VoteType } from "../types";

class StreamersService {
  async fetchStreamers(): Promise<Streamer[]> {
    try {
      const response: AxiosResponse = await axios.get("/streamers");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch streamers", error);
      throw error;
    }
  }

  async fetchStreamerById(id: string): Promise<Streamer> {
    try {
      const response: AxiosResponse = await axios.get(`/streamers/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to streamer", error);
      throw error;
    }
  }

  async createStreamer(streamer: Partial<Streamer>): Promise<Streamer> {
    try {
      const response: AxiosResponse = await axios.post("/streamers", streamer);
      return response.data;
    } catch (error) {
      console.error("Failed to create streamer", error);
      throw error;
    }
  }

  async voteForStreamer(id: string, type: VoteType): Promise<Streamer> {
    try {
      const response: AxiosResponse = await axios.put(`/streamers/${id}/vote`, {
        type,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to vote for streamer", error);
      throw error;
    }
  }
}

const streamersService = new StreamersService();
export default streamersService;
