import React, { useState } from "react";
import parse from "html-react-parser";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Grid from "@mui/material/Unstable_Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "scroll",
  minWidth: 600,
  maxHeight: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CoinCard = (props) => {
  const { isLoading, isOpen, data, setIsModalOpen } = props;
  const [expanded, setExpanded] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
    setExpanded(false); //closes description accordion as well when box closes
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardHeader // Modal Header
            avatar={<Avatar alt={data?.name} src={data?.image?.thumb} />}
            title={data?.name}
            subheader={data?.symbol}
            action={
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid xs={6}>
                <Table aria-label="a dense table" size="small">
                  <TableBody>
                    <TableRow key={`${data.name}-1`} sx={{ th: { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Typography variant="body2" color="text.secondary">
                          <Link href={data?.links?.homepage}>Homepage</Link>
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={`${data.name}-2`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography variant="body2" color="text.secondary">
                          Market cap in Euro
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {data?.market_cap?.eur ? data.market_cap.eur : "--"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid xs={6}>
                <Table aria-label="a dense table" size="small">
                  <TableBody>
                    <TableRow
                      key={`${data.name}-3`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography variant="body2" color="text.secondary">
                          Hashing Algorithm
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {data?.hashing_algorithm
                          ? data.hashing_algorithm
                          : "--"}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={`${data.name}-4`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography variant="body2" color="text.secondary">
                          Genesis Date
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {data?.genesis_date ? data.genesis_date : "--"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </CardContent>
          {/* Description Accordion  */}
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Description:</Typography>
              <Typography paragraph variant="body2" color="text.secondary">
                {parse(data?.description?.en)}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Modal>
    </div>
  );
};

export default CoinCard;
