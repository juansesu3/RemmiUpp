import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Admin } from "@/models/admin";

const handle = async (req, res) => {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const { method } = req;

  if (method === "POST") {
    const { email } = req.body;

    res.json(await Admin.create({ email }));
  }
};
export default handle;
