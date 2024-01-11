import dbConnect from '../../../db/connect';
import Comment from '../../../db/models/Comment';


export default async function handler(req, res) {

  await dbConnect();

  if (req.method === `POST`) {
    // const comment = await Comment.create(request.body);
    
    const comments = req.body;
    const newComment = await Comment.create(comments);
    return res.status(200).json({ success: true, data: comments});
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