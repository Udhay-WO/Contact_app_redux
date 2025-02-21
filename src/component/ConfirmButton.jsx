/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmDialog = (props) => {
  const { open, onConfirm, index, setOpenConfirm, confirmMessage } = props;
  const handleCancel = () => {
    setOpenConfirm(false);
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpenConfirm(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{confirmMessage}</DialogTitle>
      <DialogActions>
        <Button variant="contained" onClick={handleCancel} color="secondary">
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpenConfirm(false);
            onConfirm(index);
          }}
          color="default"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
