import { useCallback, useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useStreamers } from "../context/StreamersContext";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AvatarImage from "../img/avatar.jpeg";
import { Badge } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { platforms } from "../shared";
import { VoteType } from "../types";

const Streamer = () => {
  const { fetchStreamerById, streamer, voteForStreamer } = useStreamers();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchStreamer = useCallback(
    async (id: string) => {
      await fetchStreamerById(id);
      setLoading(false);
    },
    [fetchStreamerById]
  );

  useEffect(() => {
    if (id) {
      fetchStreamer(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!streamer) {
    return <Navigate to="/error" />;
  }

  const handleVote = (type: VoteType) => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else {
      voteForStreamer(streamer.id, type);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mt: 6,
        }}
      >
        <Avatar
          alt={streamer.name}
          src={AvatarImage}
          sx={{ width: 200, height: 200 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            gap: 1,
          }}
        >
          <Typography
            component="h1"
            variant="h1"
            fontWeight={500}
            align="center"
            color="text.primary"
          >
            {streamer.name}
          </Typography>
          <Typography
            sx={{ mb: 1 }}
            component="h6"
            variant="h5"
            color="text.primary"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={platforms[streamer.platform].img}
                alt={platforms[streamer.platform].label}
                style={{
                  marginRight: "8px",
                  width: "40px",
                }}
              />
              <span>{platforms[streamer.platform].label}</span>
            </div>
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              color="success"
              badgeContent={streamer.likes.length}
            >
              <Button
                disabled={streamer.likes.includes(user.id)}
                variant="outlined"
                color="success"
                onClick={() => handleVote(VoteType.LIKE)}
              >
                <ThumbUpIcon />
              </Button>
            </Badge>
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              color="error"
              badgeContent={streamer.dislikes.length}
            >
              <Button
                disabled={streamer.dislikes.includes(user.id)}
                variant="outlined"
                color="error"
                onClick={() => handleVote(VoteType.DISLIKE)}
              >
                <ThumbDownIcon />
              </Button>
            </Badge>
          </Stack>
        </Box>
      </Box>
      <Typography
        mt={5}
        variant="h5"
        align="center"
        color="text.secondary"
        paragraph
      >
        {streamer.description}
      </Typography>
    </>
  );
};

export default Streamer;
