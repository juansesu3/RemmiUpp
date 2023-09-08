import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const FormRefills = () => {
  const [amount, setAmount] = useState(false);
  const [currency, setCurrency] = useState("EU");
  const [date, setDate] = useState(null);
  const router = useRouter();

  const currencies = [
    { name: "euro", code: "EUR", symbol: "€" },
    { name: "dollar", code: "USD", symbol: "$", exchange_rate: 1.18 },
    { name: "pund", code: "GBP", symbol: "£", exchange_rate: 0.85 },
    { name: "yen", code: "JPY", symbol: "¥", exchange_rate: 130.25 },
    { name: "yuan", code: "CNY", symbol: "¥", exchange_rate: 7.78 },
  ];
  const handleStartDateChange = (date) => {
    const selectedDate = moment(date);
    const timezoneOffset = selectedDate.utcOffset();
    const adjustedDate = selectedDate.subtract(timezoneOffset, "minutes");
    const formattedDate = adjustedDate.format("MM/DD/YYYY HH:mm"); // Formatea la fecha como "mes/día/año y minutos"
    console.log("Formatted Date >>", formattedDate);

    setDate(adjustedDate); // Almacena el objeto Moment en el estado
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const dateToStore = date?.toDate();
    const data = { date: dateToStore, amount, currency };

    await axios.post("/api/refill", data);
    router.push("/");
  };

  return (
    <div className="w-full h-78 flex flex-col-reverse md:flex-row md:w-60">
      <form
        onSubmit={handleSubmit}
        className="bg-tableBg w-full md:max-w-sm rounded-md shadow-lg p-4"
      >
        <div className="flex flex-col gap-4  justify-center items-center">
          <label>Refill here</label>
          <div className="flex gap-2 ">
            <input
              onChange={(ev) => setAmount(ev.target.value)}
              value={amount}
              className=" text-center"
              type="number"
              placeholder="00.00"
            />
            <label>
              {" "}
              <span className="text-orange-500">*</span>
            </label>
            <select
              className=""
              value={currency}
              onChange={(ev) => setCurrency(ev.target.value)}
            >
              {currencies.length > 0 &&
                currencies.map((curr) => (
                  <option key={curr.name} value={curr.code}>
                    {curr.code}
                  </option>
                ))}
            </select>
            <label>
              {" "}
              <span className="text-orange-500">*</span>
            </label>
          </div>
          <div className="flex flex-col w-52">
            <label>
              Refill Date <span className="text-green-500/20">(optional)</span>
            </label>
            <DatePicker
              placeholderText="refill date"
              selected={date ? new Date(date) : null}
              onChange={(date) => handleStartDateChange(date)}
            />
          </div>
          <button type="submit" className="btn-primary w-52">
            Refill
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRefills;
