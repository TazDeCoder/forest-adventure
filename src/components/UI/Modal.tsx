import React, { useState } from 'react';
import {
  Backdrop,
  Modal as ModalWindow,
  Fade,
  Box,
  Button,
  Typography,
} from '@mui/material';

type Props = {
  title: string;
  description: string;
  confirmText: string;
  callback: () => void;
};

export default function Modal({
  title,
  description,
  confirmText,
  callback,
}: Props) {
  const [open, setOpen] = useState(true);

  const closeHandler = () => setOpen(false);

  const onClickHandler = () => {
    setOpen(false);
    callback();
  };

  return (
    <div>
      <ModalWindow
        open={open}
        onClose={closeHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '90%',
              maxWidth: '30rem',
              p: 4,
              textAlign: 'center',
              bgcolor: 'background.paper',
              border: '1px solid #000',
              borderRadius: 4,
              boxShadow: 24,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              {title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
            <Button
              sx={{ display: 'block', m: '2rem auto 1rem' }}
              variant="contained"
              onClick={onClickHandler}
            >
              {confirmText}
            </Button>
          </Box>
        </Fade>
      </ModalWindow>
    </div>
  );
}
