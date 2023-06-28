import React, { createContext, useState, useContext, ReactNode } from "react";
import { Streamer, VoteType } from "../types";
import streamersService from "../services/streamers.service";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface StreamersContextType {
  streamers: Streamer[];
  streamer: Streamer | undefined;
  fetchStreamers: () => Promise<void>;
  fetchStreamerById: (id: string) => Promise<void>;
  createStreamer: (streamer: Partial<Streamer>) => Promise<void>;
  voteForStreamer: (id: string, type: VoteType) => Promise<void>;
}

const StreamersContext = createContext<StreamersContextType | undefined>(
  undefined
);

interface StreamersProviderProps {
  children: ReactNode;
}

const StreamersProvider: React.FC<StreamersProviderProps> = ({ children }) => {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [streamer, setStreamer] = useState<Streamer | undefined>(undefined);

  const fetchStreamers = async (): Promise<void> => {
    try {
      const streamers = await streamersService.fetchStreamers();
      setStreamers(streamers);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStreamerById = async (id: string): Promise<void> => {
    try {
      const streamer = await streamersService.fetchStreamerById(id);
      setStreamer(streamer);
    } catch (error) {
      console.error(error);
    }
  };

  const createStreamer = async (streamer: Partial<Streamer>): Promise<void> => {
    try {
      const newStreamer = await streamersService.createStreamer(streamer);
      setStreamers([...streamers, newStreamer]);
      toast.success("Streamer created!");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          `Creating streamer failed: ${
            error.response?.data?.message.toString() || "Something went wrong."
          }`
        );
      }
    }
  };

  const voteForStreamer = async (id: string, type: VoteType): Promise<void> => {
    try {
      const updatedStreamer = await streamersService.voteForStreamer(id, type);
      setStreamers(
        streamers.map((streamer) =>
          streamer.id === id ? updatedStreamer : streamer
        )
      );
      if (streamer) {
        setStreamer(updatedStreamer);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StreamersContext.Provider
      value={{
        streamers,
        streamer,
        fetchStreamers,
        fetchStreamerById,
        createStreamer,
        voteForStreamer,
      }}
    >
      {children}
    </StreamersContext.Provider>
  );
};

const useStreamers = (): StreamersContextType => {
  const context = useContext(StreamersContext);
  if (!context) {
    throw new Error("useStreamers must be used within an StreamersProvider");
  }
  return context;
};

export { StreamersProvider, useStreamers };
