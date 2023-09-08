import { mongooseConnect } from "@/lib/mongoose";
import { Refill } from "@/models/refill";
import { isAdminRequest } from "./auth/[...nextauth]";

const handle = async (req, res) => {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const { method } = req;
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Refill.findOne({ _id: req.query.id }));
    } else {
      const refill = await Refill.find().sort({ createdAt: -1 });
      res.json(refill);
    }
  }

  if (method === "POST") {
    const {date, amount, currency } = req.body;
    const refillDoc = await Refill.create({
      date,
      amount,
      currency,
    });
    res.json(refillDoc);
  }
};
export default handle;
