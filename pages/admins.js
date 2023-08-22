import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

const AdminsPage = ({ swal }) => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);


  const addAdmin = async (ev) => {
    ev.preventDefault();
    axios.post("/api/admins", { email }).then((res) => {
      console.log(res.data);
      swal.fire({
        title: "Admin created!",
        icon: "success",
      });
      setEmail("");
    });
  };


  useEffect(() => {
    axios.get("/api/admins").then((response) => {
      setEmails(response.data);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-primary">Existing admins</h1>

      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Admin mail</td>
          </tr>
        </thead>
        <tbody>
          {emails.length > 0 &&
            emails.map((email) => (
              <tr key={email._id}>
                <td className="text-start text-white p-4">
                 {email.email}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h2 className="mt-4  text-primary">Add new admin</h2>
      <form onSubmit={addAdmin} className="mt-2">
        <div className="flex flex-row md:flex-col gap-2">
          <input
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="mb-0"
            placeholder="google email"
          />
          <button className="btn-primary md:w-32 whitespace-nowrap">
            Add admin
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default withSwal(({swal})=>(
  <AdminsPage swal={swal}/>
));
