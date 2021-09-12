import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { addToOrder, removeFromOrder } from "../actions";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { Store } from "../Store";
import { useStyles } from "../styles";
import Logo from "../components/Logo";

const ReviewScreen = (props) => {
  const { state, dispatch } = useContext(Store);
  const { orderItems, itemCount, totalPrice, taxPrice, orderType } =
    state.order;
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});
  const styles = useStyles();

  const closeHandler = () => {
    setIsOpen(false);
  };

  const productClickHandler = (p) => {
    setProduct(p);
    setIsOpen(true);
  };

  const addToOrderHandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setIsOpen(false);
  };

  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, product);
    setIsOpen(false);
  };

  const proceedToCheckoutHandler = ()=>{
      props.history.push('select-payment');
  }
  return (
    <Box className={[styles.root]}>
      <Box className={[styles.main, styles.navy, styles.center]}>
        <Dialog
          maxWidth="sm"
          fullWidth={true}
          open={isOpen}
          onClose={closeHandler}
        >
          <DialogTitle className={styles.center}>
            Add {product.name}
          </DialogTitle>
          <Box className={[styles.row, styles.center]}>
            <Button
              variant="contained"
              color="primary"
              disabled={quantity === 1}
              onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}
            >
              <RemoveIcon />
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
            <Typography>{quantity}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                setQuantity(quantity + 1);
                console.log(quantity);
              }}
            >
              <AddIcon />
            </Button>
          </Box>
          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={cancelOrRemoveFromOrder}
              variant="contained"
              color="primary"
              className={styles.largeButton}
            >
              {orderItems.find((x) => x.name === product.name)
                ? "Remove From Order"
                : "Cancle"}
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
        <Box className={[styles.center,styles.column]}>
            <Logo large/>
            <Typography
                gutterBottom
                className={styles.title}
                variant="h3"
                component="h3"
            >
                Review my {orderType} order
            </Typography>
        </Box>
        <Grid container>
            {
                orderItems.map((orderItem)=>(
                    <Grid item md={12} key={orderItem.name}>
                        <Card
                            className={styles.card}
                            onClick={()=>productClickHandler(orderItem)}
                        >
                            <CardActionArea>
                                <CardContent>
                                    <Box className={[styles.row,styles.between]}>
                                        <Typography
                                            gutterBottom
                                            variant="body2"
                                            color="textPrimary"
                                            component="p"
                                        >
                                            {orderItem.name}
                                        </Typography>
                                        <Button variant="contained">Edit</Button>
                                    </Box>
                                    <Box className={[styles.row,styles.between]}>
                                        <Typography
                                            variant="body2"
                                            color="textPrimary"
                                            component="p"
                                        >
                                            {orderItem.calorie} Cal
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textPrimary"
                                            component="p"
                                        >
                                            {orderItem.quantity} x {orderItem.price}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
      </Box>
      <Box>
          <Box>
              <Box className={[styles.bordered,styles.space]}>
                  My Order - {orderType === 'takeout' ? 'Take out' : 'Eat in'} | Tax:
                  ${taxPrice} | Total: ${totalPrice} | Items: {itemCount}
              </Box>
              <Box className={[styles.row,styles.around]}>
                <Button
                    onClick={()=>{
                        props.history.push('/order')
                    }}
                    variant="contained"
                    color="primary"
                    className={styles.largeButton}
                >
                    Back
                </Button>
                <Button
                    onClick={proceedToCheckoutHandler}
                    variant="contained"
                    color="secondary"
                    className={styles.largeButton}
                    disabled={orderItems.length === 0}
                >
                    Proceed To Checkout
                </Button>
              </Box>
          </Box>
      </Box>
    </Box>
  );
};

export default ReviewScreen;