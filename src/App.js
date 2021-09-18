import { CssBaseline,ThemeProvider ,Container,Paper, createMuiTheme} from "@material-ui/core";
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChooseScreen from "./screens/ChooseScreen";
import OrderScreen from "./screens/OrderScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SelectPaymentScreen from "./screens/SelectPaymentScreen";
import PaymentScreen from "./screens/PaymentScreen";
import CompleteOrderScreen from "./screens/CompleteOrderScreen";


const theme = createMuiTheme({
  typography:{
    h1:{
      fontWeight:'bold'
    },
    h2:{
      fontSize:'2rem',
      color:'black'
    },
    h3:{
      fontSize:'1.8rem',
      fontWeight:'bold',
      color:'white'
    }
  },
  palette:{
    primary:{main:'#ff1744'},
    secondary:{
      main:'#118e16',
      contrastText:'#ffffff'
    }
  }
})

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth="sm">
          <Paper>
            <Route path="/" component={HomeScreen} exact/>
            <Route path="/choose" component={ChooseScreen} exact/>
            <Route path="/order" component={OrderScreen} exact/>
            <Route path="/review" component={ReviewScreen} exact/>
            <Route path="/select-payment" component={SelectPaymentScreen} exact/>
            <Route path="/payment" component={PaymentScreen} exact/>
            <Route path="/complete" component={CompleteOrderScreen} exact/>
          </Paper>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
