import { Box, Grid,ListItem,List ,Avatar,CircularProgress,Card,CardActionArea,CardMedia,CardContent} from "@material-ui/core"
import { useContext, useEffect, useState } from "react";
import { addToOrder, clearOrder, listCategories, listProducts, removeFromOrder } from "../actions";
import { Store } from "../Store";
import { useStyles } from "../styles";
import Logo from "../components/Logo";
import { Alert } from "@material-ui/lab";
import RemoveIcon from "@material-ui/icons/Remove"
import AddIcon from "@material-ui/icons/Add"
import { Typography } from "@material-ui/core";
import { Dialog ,DialogTitle,Button} from "@material-ui/core";
import { TextFields } from "@material-ui/icons";

const OrderScreen = (props) => {

    const {state,dispatch} = useContext(Store);
    const {categories,loading,error} = state.categoryList;
    const {
        products,
        loading:loadingProducts,
        error:errorProducts
    }= state.productList;

    const {
      orderItems,
      itemCount,
      totalPrice,
      taxPrice,
      orderType
    }=state.order;

    const styles = useStyles();
    const [categoryName , setCategoryName] = useState('');
    const [quantity , setQuantity] = useState(1);
    const [isOpen , setIsOpen] = useState(false);
    const [product , setProduct] = useState({});

    const closeHandler = () =>{
        setIsOpen(false);
    }

    const productClickHandler = (p) =>{
        setProduct(p);
        setIsOpen(true);
    }

    const addToOrderHandler = () =>{
        addToOrder(dispatch,{...product,quantity});
        setIsOpen(false);
    }

    const cancelOrRemoveFromOrder = () =>{
        removeFromOrder(dispatch,product);
        setIsOpen(false);
    }

    const previewOrderHandler =()=>{
      props.history.push('/review')
    }

    

    useEffect(()=>{
        if (!categories) {
            listCategories(dispatch);
        } else {
            listProducts(dispatch,categoryName);
        }
        
    },[dispatch,categoryName,categories]);

    
    const categoryClickHandler = (name) =>{
        setCategoryName(name);
        listProducts(dispatch,categoryName);
    }

    return (
        <Box className={styles.root}>
            <Dialog
                maxWidth="sm"
                fullWidth={true}
                open={isOpen}
                onClose={closeHandler}
            >
                <DialogTitle className={styles.center}>
                    Add {product.name}
                </DialogTitle>
                <Box className={[styles.row,styles.center]}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={quantity===1}
                        onClick={(e)=>quantity > 1 && setQuantity(quantity - 1)}
                    >
                        <RemoveIcon/>
                    </Button>
                {/* <TextFields
                    inputProps={{className:styles.largeInput}}
                    InputProps={{
                        bar:true,
                        inputProps:{
                            className:styles.largeInput
                        }
                    }}
                    className={styles.largeNumber}
                    type="number"
                    variant="filled"
                     min={1}
                    value={quantity}
                /> */}
                <Typography>
                    {quantity}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e)=>{setQuantity(quantity + 1)
                        console.log(quantity)
                    }}
                >
                    <AddIcon/>
                </Button>
                </Box>
                <Box className={[styles.row,styles.around]}>
                    <Button
                        onClick={cancelOrRemoveFromOrder}
                        variant="contained"
                        color="primary"
                        className={styles.largeButton}
                    >
                        {orderItems.find((x)=> x.name === product.name)
                        ? 'Remove From Order'
                        : 'Cancle'}
                    </Button>
                    <Button
                        onClick={addToOrderHandler}
                        variant="contained"
                        color="primary"
                        size="large"
                        className={styles.largeButton}
                    >
                        ADD To Order
                    </Button>
                </Box>
            </Dialog>
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
                                   <ListItem onClick={()=>categoryClickHandler('')} button>
                                       <Logo/>
                                   </ListItem>
                                    {
                                        categories.map((category)=>(
                                            <ListItem button key={category.name}
                                                onClick={()=>categoryClickHandler(category.name)}
                                            >
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
                        <Typography
                            gutterBottom
                            className={styles.title}
                            variant="h2"
                            component="h2"
                        >
                            {categoryName || 'Main Menu'}
                        </Typography>
                        <Grid container spacing={1}>
                            {
                                loadingProducts?(
                                    <CircularProgress/>
                                ):errorProducts?(
                                    <Alert severity="error">{errorProducts}</Alert>
                                ):(
                                    products.map(product=>(
                                        <Grid item md={6}>
                                            <Card className={styles.card}
                                                onClick={()=>productClickHandler(product)}
                                            >
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt={product.name}
                                                        image={product.image}
                                                        className={styles.media}
                                                    />
                                                </CardActionArea>
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="body2"
                                                        color="textPrimary"
                                                        component="p"
                                                    >
                                                        {product.name}
                                                    </Typography>
                                                    <Box className={styles.cardFooter}>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="p"
                                                    >
                                                        {product.calorie} Cal
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textPrimary"
                                                        component="p"
                                                    >
                                                        ${product.price}
                                                    </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box>
              <Box>
                <Box className={[styles.bordered,styles.space]}>
                MyOrder - {orderType} | Tax: ${taxPrice} | Total: ${totalPrice} | Items:{itemCount}
                </Box>
                <Box className={[styles.row,styles.around]}>
                      <Button
                        onClick={()=>{
                          clearOrder(dispatch)
                          props.history.push('/');
                        }}
                        variant="contained"
                        color="primary"
                        className={styles.largeButton}
                      >
                        Cancle Order
                      </Button>
                      <Button
                        onClick={previewOrderHandler}
                        variant="contained"
                        color="primary"
                        className={styles.largeButton}
                        disabled={orderItems.length===0}
                      >
                        Done
                      </Button>
                </Box>
              </Box>
            </Box>
            
        </Box>
    )
}

export default OrderScreen
