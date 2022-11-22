import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { List, Paper, Typography, Grid } from "@mui/material";
import ListQuote from "./components/ListQuote";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_API_URL = `https://amiiboapi.com/api/`;

function App() {
  const [quotes, setQuotes] = useState([]);
  const [gameseries, setGameseries] = useState([]);
  // const [page, setPage] = useState(1);

  console.log(quotes);

  useEffect(() => {
    async function getQuotes() {
      await axios
        .get(`${BASE_API_URL}/amiibo`, {
          // params: {
          //   page: page
          // }
        })
        .then((res) => {
          console.log(res.data.amiibo);
          const responseData = res.data.amiibo;
          setQuotes(responseData);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }

    getQuotes();

    async function getGameseries() {
      await axios
        .get(`${BASE_API_URL}/gameseries`, {
          // params: {
          //   page: page
          // }
        })
        .then((res) => {
          console.log(res.data.amiibo);
          const responseData = res.data.amiibo;
          setGameseries(responseData);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }

    getGameseries();
  }, []);

  return (
    <div className="App">
      <div className="list-container">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="list-title-wrapper">
              <Typography variant="h4">Amiibo</Typography>
            </div>
              <Paper elevation={2} style={{ maxHeight: "700px", overflow: "auto" }}>
                <List>
                  {quotes.map((d, idx) => (
                    <ListQuote
                      key={d.id}
                      primaryText={`${d.amiiboSeries}`}
                      secondaryText={`${d.character}`}
                    />
                  ))}
                </List>
              </Paper>
          </Grid>
          <Grid item xs={6}>
          <div className="list-title-wrapper">
              <Typography variant="h4">Game Series</Typography>
            </div>
              <Paper elevation={2} style={{ maxHeight: "700px", overflow: "auto" }}>
                  <List>
                    {gameseries.map((d, idx) => (
                      <ListQuote
                        key={d.id}
                        primaryText={`${d.key}`}
                        secondaryText={`${d.name}`}
                      />
                    ))}
                  </List>
                </Paper>
          </Grid>
        </Grid>
        
      </div>
    </div>
  );
}

export default App;