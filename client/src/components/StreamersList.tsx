import { useEffect } from "react";
import List from "@mui/material/List";
import StreamersListItem from "./StreamersListItem";
import Typography from "@mui/material/Typography";
import { useStreamers } from "../context/StreamersContext";

const StreamersList = () => {
  const { fetchStreamers, streamers } = useStreamers();

  useEffect(() => {
    fetchStreamers();
  }, [fetchStreamers]);

  return (
    <>
      <Typography component="h1" variant="h3" mt={8}>
        Streamers List
      </Typography>
      <List sx={{ bgcolor: "background.paper", px: 7 }}>
        {streamers.length === 0 && (
          <Typography component="h1" variant="h5" my={2}>
            No streamers yet 😢
          </Typography>
        )}
        {streamers.map((streamer) => (
          <StreamersListItem key={streamer.id} data={streamer} />
        ))}
      </List>
    </>
  );
};

export default StreamersList;
