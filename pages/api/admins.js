import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Admin } from "@/models/admin";

const handle = async (req, res) => {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Admin.findOne({ _id: req.query.id }));
    } else {
      const AdminDoc = await Admin.find().sort({ createdAt: -1 });

      // Ordenar los gastos por fecha en orden ascendente

      res.json(AdminDoc);
    }
  }

  if (method === "POST") {
    const { email } = req.body;

    res.json(await Admin.create({ email }));
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Admin.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
};
export default handle;
