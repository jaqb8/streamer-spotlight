import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Platform } from "../types";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useStreamers } from "../context/StreamersContext";
import { useState } from "react";
import { platforms } from "../shared";

const AddStreamer = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { createStreamer } = useStreamers();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platform: Platform.TWITCH,
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth.isAuthenticated) {
      return navigate("/signin");
    } else {
      createStreamer({
        name: formData.name,
        description: formData.description,
        platform: formData.platform,
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add streamer
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Name"
            name="name"
            autoFocus
            onChange={onChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            multiline
            rows={3}
            onChange={onChange}
          />
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            label="Platform"
            name="platform"
            defaultValue={platforms[Platform.TWITCH].value}
            helperText="Please select streaming platform"
            onChange={onChange}
          >
            {Object.values(platforms).map((option) => (
              <MenuItem key={option.label} value={option.value}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                  }}
                >
                  <img
                    src={option.img}
                    alt={option.label}
                    style={{
                      marginRight: "8px",
                      width: "20px",
                    }}
                  />
                  <span>{option.label}</span>
                </div>
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddStreamer;
