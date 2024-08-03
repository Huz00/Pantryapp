"use client"; // Only necessary if using the `app` directory structure
import { firestore } from '@/firebase';
import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

const Home = () => {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);

  const updatePantry = async () => {
    const snapshot = await getDocs(collection(firestore, 'pantry'));
    const pantryList = [];
    snapshot.forEach((doc) => {
      pantryList.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setPantry(pantryList);
  };

  const addItem = async () => {
    const docRef = doc(collection(firestore, 'pantry'), itemName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + itemQuantity }, { merge: true });
    } else {
      await setDoc(docRef, { quantity: itemQuantity });
    }

    await updatePantry();
    handleClose();
    setItemName('');  // Clear item name
    setItemQuantity(1);  // Reset item quantity to 1
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item.id);  // Use item.id here
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 }, { merge: true });
      }
    }
    await updatePantry();
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const handleOpen = () => {
    setItemName('');  // Clear item name
    setItemQuantity(1);  // Reset item quantity to 1
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Pantry Items
      </Typography>
      <Paper style={{
        padding: 16,
        marginBottom: 16,
        backgroundColor: 'rgba(var(--paper-background-rgb), 0.9)',
        border: '1px solid',
        borderColor: 'rgba(var(--paper-border-color), 0.9)',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <List>
          {pantry.map((item) => (
            <ListItem key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              margin: '8px 0',
              borderRadius: '8px',
              padding: '8px 16px',
            }}>
              <ListItemText primary={item.id} secondary={`Quantity: ${item.quantity}`} />
              <Button variant="contained" color="secondary" onClick={() => removeItem(item)}>
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleOpen} fullWidth>
            Add Item
          </Button>
        </Box>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={itemQuantity}
            onChange={(e) => setItemQuantity(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addItem} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
