import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function Customers() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    UsersGet();
  }, []);

  const UsersGet = () => {
    fetch("http://53.180.62.50.host.secureserver.net:5000/api/Customer/GetCustomer")
      //fetch("https://www.mecallapi.com/api/users")
      .then((res) => res.json())
      .then((result) => {
        debugger;
        console.log(result);
        setUsers(result);
      });
  };

  const UpdateUser = (id) => {
    window.location = "/customer/update/" + id;
  };

  const UserDelete = (id) => {
    var data = {
      id: id,
    };
    fetch("https://www.mecallapi.com/api/users/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          UsersGet();
        }
      });
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                CUSTOMERS
              </Typography>
            </Box>
            <Box>
              <Link to="/customer/create">
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="left">First</TableCell>
                  <TableCell align="left">Last</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.CustId}>
                    <TableCell align="right">{user.CustId}</TableCell>
                    {/* <TableCell align="center">
                      <Box display="flex" justifyContent="center">
                        <Avatar src={user.avatar} />
                      </Box>
                    </TableCell> */}
                    <TableCell align="left">{user.CustName}</TableCell>
                    <TableCell align="left">{user.CustCompanyName}</TableCell>
                    <TableCell align="left">{user.CustCompanyCode}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        <Button onClick={() => UpdateUser(user.CustId)}>
                          {" "}
                          Edit
                        </Button>
                        <Button onClick={() => UserDelete(user.CustId)}>
                          {" "}
                          Del
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}
