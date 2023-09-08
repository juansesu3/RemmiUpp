import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import moment from "moment";

const ViewExpensesPage = () => {
  const router = useRouter();
  const [expInfo, setExpInfo] = useState(null);
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    if (!id) {
      return;
    }
    axios.get("/api/expenses?id=" + id).then((response) => {
      setExpInfo(response.data);
      setIsLoading(false);
    });
  }, [id]);
  const goBack = () => {
    router.push("/expenses");
  };
  const deleteProyect = async () => {
    await axios.delete("/api/expenses?id=" + id);
    goBack();
  };
  const handleClick = () => {
    goBack();
  };

  return (
    <Layout>
      <div className=" rounded-md flex flex-col gap-2 justify-between p-4 bg-tableBg w-full shadow-md">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary font-medium">Store name</h2>
          <p className="bg-bgGray text-white font-medium p-4 w-30 rounded-lg shadow-lg text-center">
            {isLoading && <Spinner />}
            {expInfo?.storeName}
          </p>
        </div>
        <div className="flex gap-1 justify-around">
          <div>
            <h2 className="text-primary font-medium text-center">
              Purchase Date
            </h2>
            <p className="bg-bgGray text-white font-medium p-4 mt-2 rounded-lg shadow-lg text-center">
              {expInfo?.date
                ? moment(expInfo.date).format("MM/DD/YYYY HH:mm")
                : "not available"}
            </p>
          </div>
          <div>
            <h2 className="text-primary font-medium text-center">
              Upload Date
            </h2>
            <p className="bg-bgGray text-white font-medium p-4  mt-2 rounded-lg shadow-lg text-center">
              {expInfo?.createdAt
                ? moment(expInfo.createdAt).format("MM/DD/YYYY HH:mm")
                : "not available"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-primary font-medium">Amount</h2>
          <p className="bg-bgGray text-white font-medium p-4 w-24 rounded-lg shadow-lg text-center">
            {expInfo?.amount}
            <span className="text-red-500"> €</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-primary font-medium">Check image</h2>
          {isLoading && <Spinner />}
          {
            <a
              href={expInfo?.imgCheck[0] ? expInfo?.imgCheck[0] : "/"}
              target="_blank"
            >
              <Image
                src={expInfo?.imgCheck[0] ? expInfo?.imgCheck[0] : "/"}
                alt="Check image"
                width={100}
                height={100}
                className="rounded-md shadow-md w-44 m-auto"
              />
            </a>
          }
        </div>
        <button onClick={handleClick} className="btn-primary">
          Back to expenses
        </button>
      </div>
    </Layout>
  );
};

export default ViewExpensesPage;
