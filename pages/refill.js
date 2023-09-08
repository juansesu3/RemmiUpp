import FormRecharges from "@/components/FormRefills";
import Layout from "@/components/Layout";
import Pocket from "@/components/Pocket";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
const RechargePage = () => {
  const dateFormat = "MM/dd/yyyy HH:mm:ss";
  const [refilss, setRefills] = useState([]);
  useEffect(() => {
    axios.get("api/refill").then((response) => {
      setRefills(response.data);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-primary ">Refill page</h1>
      <div className="flex flex-col gap-2 mt-4">
        <div className=" flex flex-col-reverse w-full gap-2 justify-center items-center md:justify-start md:flex-row">
          <FormRecharges />
          <Pocket />
        </div>
        <table className="basic">
          <thead>
            <tr>
              <td>mount</td>
              <td>date</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {refilss &&
              refilss.map((reff) => (
                <tr key={reff._id}>
                  <td className="whitespace-nowrap">
                    {reff.amount}
                    <span className="text-green-600 "> €</span>{" "}
                  </td>
                  <td>{format(new Date(reff.createdAt), dateFormat)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default RechargePage;
