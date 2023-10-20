import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
export default async function Index({ params }: { params: { appId: string } }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ flexGrow: 1, pt: ["48px", "56px", "64px"] }}>
        <iframe
          sandbox="allow-scripts allow-popups allow-same-origin allow-pointer-lock"
          allow="clipboard-write"
          src="https://playzool.com/games/bricksBreaker/?fromPartner=nowgg&amp;utm_source=nowgg&amp;utm_medium=iframe&amp;utm_campaign=nowgg"
          allowFullScreen={true}
          width={"100%"}
          height={"100%"}
          frameBorder={0}
        ></iframe>
      </Box>
    </Box>
  );
}
