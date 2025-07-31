import {
  TableContainer,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@mui/material";

import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

import style from "./mystyle.module.css";

function QuotationTable({ data, deleteByIndex }) {
  if (!data || data.length === 0) {
    return (
      <TableContainer>
        <h1>Quotation</h1>
        <p>
          <CiShoppingCart /> No items
        </p>
      </TableContainer>
    );
  }

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  const handleClear = () => {
    deleteByIndex("ALL"); // Tell parent to clear all
  };

  const total = data.reduce((acc, v) => acc + v.qty * v.ppu, 0);
  const totalDiscount = data.reduce((acc, v) => acc + (v.discount ?? 0), 0);
  const totalAfterDiscount = total - totalDiscount;

  return (
    <TableContainer>
      <h1>Quotation</h1>
      <Button
        variant="outlined"
        onClick={handleClear}
        className="mb-3"
        style={{ marginBottom: "16px" }}
      >
        <MdClear /> Clear
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={style.textCenter}>-</TableCell>
            <TableCell className={style.textCenter}>Qty</TableCell>
            <TableCell className={style.textCenter}>Item</TableCell>
            <TableCell className={style.textCenter}>Price/Unit</TableCell>
            <TableCell className={style.textCenter}>Amount</TableCell>
            <TableCell className={style.textCenter}>Discount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((v, i) => {
            const amount = v.qty * v.ppu;
            const discount = v.discount ?? 0;
            return (
              <TableRow key={i}>
                <TableCell className={style.textCenter}>
                  <BsFillTrashFill
                    onClick={() => handleDelete(i)}
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
                <TableCell className={style.textCenter}>{v.qty}</TableCell>
                <TableCell>{v.item}</TableCell>
                <TableCell className={style.textCenter}>{v.ppu}</TableCell>
                <TableCell className={style.textRight}>
                  {amount - discount}
                </TableCell>
                <TableCell className={style.textRight}>{discount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className={style.textRight}>
              Total Amount
            </TableCell>
            <TableCell className={style.textRight}>{totalAfterDiscount}</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} >Total Discount</TableCell>
            <TableCell className={style.textRight}>{totalDiscount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default QuotationTable;
