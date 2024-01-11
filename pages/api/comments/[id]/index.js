import dbConnect from "../../../../db/connect";
import Comment from "../../../../db/models/Comment";


export default async function handler(req, res) {

  const { id } = req.query;
  await dbConnect();

  if (req.method === `POST`) {
    const comments = req.body;
    const newComment = await Comment.create(comments);
    return res.status(200).json({ success: true, data: newComment});
  }

  // if (req.method === `GET`) {
  //   const place = await Place.findById(id);
  //   return res.status(200).json({ place: place});
  // }
  
  
  // if (req.method === `DELETE`) {
  //   const place = await Place.findByIdAndDelete(id);

  //   return res.status(200).json({ place: place, mesg: "delete"});
  // }
  
}