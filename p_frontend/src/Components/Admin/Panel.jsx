import React ,{useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../Styles/AdminPanel.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Url} from '../Common/Url'

export default function Panel() {

  const [NumberOfProfessions, setNumberOfProfessions] = useState(0)
  const [NumberOfUsers, setNumberOfUsers] = useState(0)
  const [NumberOfWorkers, setNumberOfWorkers] = useState(0)

  const getTotalNumberOfProfesiones = async () => {
    const result = await axios.get(Url+'getTotalNumberoOfProfesiones');
    console.log("getTotalNumberoOfProfesiones:" + result.data);
    setNumberOfProfessions(result.data)
  }
  const getTotalNumberOfUsers = async () => {
    const result = await axios.get(Url+'getTotalNumberoOfUsers');
    console.log("getTotalNumberoOfUsers:" + result.data);
    setNumberOfUsers(result.data)
  }
  const getTotalNumberOfWorkers = async () => {
    const result = await axios.get(Url+'getTotalNumberOfWorkers');
    console.log("getTotalNumberOfWorkers:" + result.data);
    setNumberOfWorkers(result.data)
  }

  useEffect(() => {
    getTotalNumberOfProfesiones();
    getTotalNumberOfUsers();
    getTotalNumberOfWorkers();
  }, [])
  

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <div className='adminPanelMainContainer'>
      <div className='adminPanelSubOneContainer'>
        <Card sx={{ width:"80%" }}>
          <Link to="/Admin/ManageProfessions">
            <CardContent>
              <Typography color="text.primary" gutterBottom>
                Profesiones
              </Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                {NumberOfProfessions}
              </Typography>
          </CardContent>
          </Link>
        </Card>

        <Card sx={{ width:"80%" }}>
          <Link to="/Admin/ManageUsers">
            <CardContent>
              <Typography color="text.primary" gutterBottom>
                Usuarios
              </Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                {NumberOfUsers}
              </Typography>
            </CardContent>
          </Link>
        </Card>

        <Card sx={{ width:"80%" }}>
          <Link to='/Admin/ManageWorkers'>
            <CardContent>
              <Typography color="text.primary" gutterBottom>
                Trabajadores
              </Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                {NumberOfWorkers}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </div>

      <div className='adminPanelSubTwoContainer'>
        <div>
          <Typography sx={{ fontSize: 20 }} variant="h6" component="div">
            Recent Orders
          </Typography>
          <TableContainer component={Paper} sx={{ width: "50%" }}>
            <Table sx={{ minWidth: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

