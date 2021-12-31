import React, { useEffect, useState } from "react";
import axiosInstance from "../../helpers/axiosInstance";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
const Team = () => {
  const [profiles, setProfiles] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  const navigate = useNavigate();
  let help = [];

  useEffect(() => {
    axiosInstance
      .get("/profiles")
      .then(({ data }) => {
        console.log(data);
        if (firstTime) {
          setFirstTime(false);
          data.data.forEach((item) => {
            help.push(item);
            setProfiles([...help]);
          });
        }
      })
      .catch((err) => {
        console.log(new Error(err));
      });
    return () => {
      console.log("cleanup");
    };
  }, []);

  profiles.sort((a, b) => (a.id > b.id ? 1 : -1));

  return (
    <Grid container spacing={2} style={{ marginTop: "120px", marginLeft: 0 }}>
      {profiles.map(({ id, attributes }) => {
        return (
          <Grid item>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  ID: {id}{" "}
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    width: "200px",
                    height: "200px",
                    margin: "auto 0",
                  }}
                >
                  Image Goes Here
                </Typography>
                <Typography variant="h5" component="div">
                  Status: {attributes.status}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Name: {attributes.name}
                </Typography>
                <Typography variant="body2">
                  Joined: {attributes.createdAt}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  size="small"
                  onClick={() => navigate(`/team${id}/edit`)}
                >
                  EDIT
                </Button>
                <Button size="small">DELETE</Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Team;
