import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography, CardMedia, Link } from "@mui/material";
import { CommonReqHeader } from "@/request/request-defined";
async function getGames() {
  const res = await fetch("http://192.168.38.174:18080/api/game/list", {
    headers: CommonReqHeader,
  });
  return res.json();
}
export default async function Index() {
  const games = await getGames();
  return (
    <Container sx={{ py: 2 }} maxWidth="lg">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {games.data.data.map((game: any) => (
          <Grid item key={game.id} xs={12} sm={6} md={4} lg={3}>
            <Link
              underline="none"
              href={`/apps/${game.id}`}
              target="_blank"
              rel="noopener"
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: "100%",
                  }}
                  image={game.icon}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {game.appName}
                  </Typography>
                  <Typography>{game.category}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
