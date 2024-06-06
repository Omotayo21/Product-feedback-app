import { connect } from "../../../dbConfig/dbConfig.mjs";
import Feedback from "../../../models/feedbackModel.mjs";
import { NextRequest, NextResponse } from "next/server";
import Comment from '../../../models/commentModel.mjs'
import User from '../../../models/userModel.mjs'
import Replies from '../../../models/repliesModel.mjs'


connect()
export async function GET(req) {


  try {
    const feedbacks = await Feedback.find()
      .populate({
        path: "comments",
        populate: {
          path: "replies",
          populate: { path: "user" },
        },
      })
      .exec();

    //return new NextResponse(JSON.stringify(feedbacks), { status: 200 });
  const response = new NextResponse(JSON.stringify(feedbacks), { status: 200 });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
