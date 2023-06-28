import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Streamer, VoteType } from "../types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Box, IconButton, Link } from "@mui/material";
import { useStreamers } from "../context/StreamersContext";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { platforms } from "../shared";

interface StreamersListItemProps {
  data: Streamer;
}

const StreamersListItem: React.FC<StreamersListItemProps> = (
  props: StreamersListItemProps
) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { voteForStreamer } = useStreamers();

  const handleVote = (type: VoteType) => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else {
      voteForStreamer(props.data.id, type);
    }
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={props.data.name} src="placeholder" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link
              component={RouterLink}
              underline="none"
              to={`/streamer/${props.data.id}`}
            >
              {props.data.name}
            </Link>
          }
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="div"
              variant="body2"
              color="text.primary"
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "left",
                }}
              >
                <img
                  src={platforms[props.data.platform].img}
                  alt={platforms[props.data.platform].label}
                  style={{
                    marginRight: "8px",
                    width: "20px",
                  }}
                />
                <span>{platforms[props.data.platform].label}</span>
              </span>
            </Typography>
          }
        />

        <Box>
          <IconButton
            disabled={props.data.likes.includes(user.id)}
            color="success"
            onClick={() => handleVote(VoteType.LIKE)}
          >
            <ThumbUpIcon />
          </IconButton>
          <span>{props.data.likes.length}</span>
          <IconButton
            disabled={props.data.dislikes.includes(user.id)}
            color="error"
            onClick={() => handleVote(VoteType.DISLIKE)}
          >
            <ThumbDownIcon />
          </IconButton>
          <span>{props.data.dislikes.length}</span>
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default StreamersListItem;
