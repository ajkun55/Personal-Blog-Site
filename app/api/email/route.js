import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const emailData = {
      email: `${formData.get("email")}`,
    };
    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (error) {
    // Check if the error is a duplicate key error
    if (error.code === 11000) {
      // 11000 is the error code for duplicate key in MongoDB
      return NextResponse.json({
        success: false,
        msg: "Email already subscribed.",
      });
    }
    // Handle other errors
    return NextResponse.json({
      success: false,
      msg: "An error occurred while subscribing.",
    });
  }
}

export async function GET(request) {
  const emails = await EmailModel.find({});
  return NextResponse.json({ emails });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Email Deleted" });
}
