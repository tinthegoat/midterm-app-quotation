import { useState, useRef } from "react";
import {
  Container,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100, discount: 10 },
  { code: "p002", name: "Product B", price: 200, discount: 20 },
  { code: "p003", name: "Product C", price: 150, discount: 15 },
  { code: "p004", name: "Product D", price: 250, discount: 25 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState(products.map((p) => ({
    item: p.name,
    ppu: p.price,
    qty: 1,
    discount: p.discount || 0,
  })));
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);

    const newItem = {
      item: item.name,
      ppu: Number(ppuRef.current.value),
      qty: Number(qtyRef.current.value),
      discount: discountRef.current.value
        ? parseFloat(discountRef.current.value)
        : 0,
    };


    
    setDataItems((prev) => {
      const index = prev.findIndex(
        (i) => i.item === newItem.item && i.ppu === newItem.ppu
      );
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          qty: updated[index].qty + newItem.qty,
          discount: newItem.discount,
        };
        return updated;
      } else {
        return [...prev, newItem];
      }
    });
  };

const deleteByIndex = (index) => {
  if (index === "ALL") {
    setDataItems([]);  
  } else {
    setDataItems(prev => prev.filter((_, i) => i !== index));
  }
};

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  return (
    <Container sx={{ paddingTop: 2 }}>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12} sx={{ backgroundColor: "#e4e4e4", padding: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="item-select-label">Item</InputLabel>
            <Select
              labelId="item-select-label"
              inputRef={itemRef}
              defaultValue={products[0].code}
              label="Item"
              onChange={productChange}
            >
              {products.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Price Per Unit"
            type="number"
            inputRef={ppuRef}
            value={ppu}
            onChange={(e) => setPpu(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Quantity"
            type="number"
            inputRef={qtyRef}
            defaultValue={1}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Discount"
            type="number"
            inputRef={discountRef}
            defaultValue={0}
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            onClick={addItem}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Add
          </Button>
        </Grid>

        <Grid item md={8} xs={12}>
          <QuotationTable data={dataItems} deleteByIndex={deleteByIndex} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
