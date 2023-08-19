import { mongooseConnect } from "@/lib/mongoose";
import { Refill } from "@/models/refill";

const handle = async (req, res) => {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Refill.findOne({ _id: req.query.id }));
    } else {
      res.json(await Refill.find());
    }
  }

  if (method === "POST") {
    const { amount, currency } = req.body;
    const refillDoc = await Refill.create({
      amount,
      currency,
    });
    res.json(refillDoc);
  }
};
export default handle;
