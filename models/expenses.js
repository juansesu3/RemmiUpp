import mongoos, { Schema, model, models } from "mongoose";

const ExpensesSchema = new Schema({
  date: { type: String, required: true },
  storeName: { type: String, required: true },
  imgCheck: { type: String,  },
  amount: { type: Number, required: true },
  expType: { type: String, required: true },
});

export const Expenses = models.Expenses || model("Expenses", ExpensesSchema);
