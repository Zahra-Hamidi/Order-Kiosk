import { Box, Grid,ListItem,List ,Avatar,CircularProgress} from "@material-ui/core"
import { useContext, useEffect } from "react";
import { listCategories } from "../actions";
import { Store } from "../Store";
import { useStyles } from "../styles";
import Logo from "../components/Logo";
import { Alert } from "@material-ui/lab";

const OrderScreen = () => {
    const styles = useStyles();
    const {state,dispatch} = useContext(Store);
    const {categories,loading,error} = state.categoryList;
    useEffect(()=>{
        listCategories(dispatch);
    },[dispatch])
    return (
        <Box className={styles.root}>
            <Box className={styles.main}>
                <Grid container>
                    <Grid item md={2}>
                        <List>
                           {
                               loading ? (
                                   <CircularProgress/>
                               ): error ? (
                                   <Alert severity="error">{error}</Alert>
                               ):(
                                   <>
                                   <ListItem button>
                                       <Logo/>
                                   </ListItem>
                                    {
                                        categories.map((category)=>(
                                            <ListItem button key={category.name}>
                                                <Avatar alt={category.name} src={category.image}/>
                                            </ListItem>
                                        ))
                                    }
                                   </>
                               )
                           }
                        </List>
                    </Grid>
                    <Grid item md={10}>
                        Food List
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default OrderScreen
