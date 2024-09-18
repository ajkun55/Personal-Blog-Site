import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
const fs = require("fs");

const { NextResponse } = require("next/server");

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

//API endpoint for getting blogs
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({ blog });
  } else {
    const blogs = await BlogModel.find({});
    //console.log("blog get hit");
    return NextResponse.json({ blogs });
  }
}

//API endpoint for uploading post
export async function POST(request) {
  const formData = await request.formData();
  const timeStamp = Date.now();
  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timeStamp}_${image.name}`;
  await writeFile(path, buffer);
  const imageUrl = `/${timeStamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imageUrl}`,
    authorImg: `${formData.get("authorImg")}`,
  };

  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog added" });
}

//API endpoint to delete blog
export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog deleted" });
}

import path from "path";

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const postId = request.nextUrl.searchParams.get("id"); // Get the post ID from query params

    // Find the existing post
    const existingPost = await BlogModel.findById(postId);
    if (!existingPost) {
      return NextResponse.json({ success: false, msg: "Post not found." });
    }

    // Handle image upload if a new image is provided
    let imageUrl = existingPost.image; // Default to the existing image URL
    const image = formData.get("image");
    if (image && image.size > 0) {
      // Delete the old image file if it exists
      const oldImagePath = path.join(
        process.cwd(),
        "public",
        existingPost.image
      );
      if (fs.existsSync(oldImagePath)) {
        await fs.promises.unlink(oldImagePath);
      }

      // Upload the new image
      const timeStamp = Date.now();
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
      const newImagePath = `./public/${timeStamp}_${image.name}`;
      await writeFile(newImagePath, buffer);
      imageUrl = `/${timeStamp}_${image.name}`;
    }

    // Prepare the updated blog data, keeping the existing values if the form data is empty
    const updatedBlogData = {
      title: formData.get("title") || existingPost.title,
      description: formData.get("description") || existingPost.description,
      category: formData.get("category") || existingPost.category,
      image: imageUrl,
      // Keep author and authorImg unchanged
      author: existingPost.author,
      authorImg: existingPost.authorImg,
    };

    // Update the post
    await BlogModel.findByIdAndUpdate(postId, updatedBlogData);

    // Return success response
    return NextResponse.json({
      success: true,
      msg: "Post updated successfully.",
    });
  } catch (error) {
    // Handle errors
    return NextResponse.json({
      success: false,
      msg: "An error occurred while updating the post.",
    });
  }
}
