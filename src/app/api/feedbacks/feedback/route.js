import { connect } from "../../../dbConfig/dbConfig.mjs";
import Feedback from "../../../models/feedbackModel.mjs";
import { NextRequest, NextResponse } from "next/server";
import Comment from '../../../models/commentModel.mjs'
import User from '../../../models/userModel.mjs'
import Replies from '../../../models/repliesModel.mjs'


connect()
export async function GET(req) {


  try {
    const urlParts = req.url.split('/');
    const timestamp = urlParts.pop();
    /*const feedbacks = await Feedback.find()
      .populate({
        path: "comments",
        populate: {
          path: "replies",
          populate: { path: "user" },
        },
      })
      .exec();*/

    if (!timestamp){
      return new NextResponse(
        JSON.stringify({ error: "Timestamp is required" }),
        { status: 400 }
      );
    }
    const feedbacks = await Feedback.find().exec();

    return new NextResponse(JSON.stringify(feedbacks), { status: 200 });
  
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
