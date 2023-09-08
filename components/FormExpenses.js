import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const FormExpenses = () => {
  const router = useRouter();
  const [date, setDate] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [imgCheck, setImgCheck] = useState([]);
  const [amount, setAmount] = useState("");
  const [expType, setExpType] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const typeShop = [
    {
      name: "BigShop",
    },
    { name: "FastShop" },
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
    const data = { date: dateToStore, storeName, imgCheck, amount, expType };
    await axios.post("/api/expenses", data);
    router.push("/expenses");
  };

  const uploadImages = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/upload", data);
      setImgCheck((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  };

  return (
    <div className="rounded-md w-full">
      <form onSubmit={handleSubmit} className="md:w-1/2 flex flex-col gap-2">
        <label>
          Store <span className="text-orange-500">*</span>
        </label>
        <input
          value={storeName}
          onChange={(ev) => setStoreName(ev.target.value)}
          type="text"
          placeholder="store name"
        />
        <div className="flex flex-col">
          <label>
            Purchase Date <span className="text-green-500/20">(optional)</span>
          </label>
          <DatePicker
            placeholderText="start date"
            selected={date ? new Date(date) : null}
            onChange={(date) => handleStartDateChange(date)}
          />
        </div>

        <label>
          Check <span className="text-orange-500">*</span>
        </label>
        <div className="mb-2 flex flex-wrap gap-1">
          {!!imgCheck?.length &&
            imgCheck.map((link) => (
              <div
                key={link}
                className=" h-24 bg-white p-2 shadow-sm rounded-lg border border-gray-100"
              >
                {console.log(link)}
                <img src={link} alt="image-proyect" className="rounded-lg" />
              </div>
            ))}

          {isUploading && (
            <div className="h-24 flex items-center ">
              <Spinner />
            </div>
          )}
          <label className=" w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-lg bg-white shadow-sm border border-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Add image</div>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div>

        <label>
          Mount <span className="text-orange-500">*</span>
        </label>
        <input
          value={amount}
          onChange={(ev) => setAmount(ev.target.value)}
          type="number"
          placeholder="00.00 €"
        />

        <label>
          Type <span className="text-orange-500">*</span>
        </label>
        <select value={expType} onChange={(ev) => setExpType(ev.target.value)}>
          {typeShop.length > 0 &&
            typeShop.map((ts) => (
              <option key={ts.name} value={ts.name}>
                {ts.name}
              </option>
            ))}
        </select>

        <button className="btn-primary mt-4">Save</button>
      </form>
    </div>
  );
};

export default FormExpenses;
