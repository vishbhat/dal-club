// @Author: Kishan Thakkar
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { FRONTEND_URL } from "../../../Assets/config/constants";

const PaymentModal = ({ open, handleClose, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${FRONTEND_URL}paymentStatus`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsLoading(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Please enter payment details
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form id="payment-form" style={{ textAlign: "center" }} onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ color: "white", textTransform: "none" }}
            disabled={isLoading}
            id="submit"
          >
            <span id="button-text">
              {isLoading ? "Processing" : `Pay $${amount}`}
            </span>
          </Button>
        {message && <Typography variant="danger">{message}</Typography>}
      </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
