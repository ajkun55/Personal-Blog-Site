"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import necessary hooks for routing
import { toast } from "react-toastify";

function Main() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id"); // Get the post ID from the URL parameters

  const [image, setImage] = useState(false);
  const initialState = {
    title: "",
    description: "",
    category: "Startup",
    author: "John Doe",
    authorImg: "/author.png",
  };
  const [data, setData] = useState(initialState);

  // Fetch existing post data if in edit mode
  useEffect(() => {
    if (postId) {
      // Check if we are in edit mode
      const fetchPostData = async () => {
        try {
          const response = await axios.get("/api/blog", {
            params: { id: postId },
          });
          console.log(response.data);
          // const response = await axios.get(`/api/blog?id=${postId}`);
          if (response.data) {
            const postData = response.data.blog; // Adjust based on your API response structure
            setData({
              title: postData.title,
              description: postData.description,
              category: postData.category,
              author: postData.author,
              authorImg: postData.authorImg,
            });
            // Set image to false initially; show the existing image
            setImage(postData.image); // Modify this as needed to show the existing image
          } else {
            toast.error("Failed to fetch post data.");
          }
        } catch (error) {
          toast.error("Error fetching post data.");
        }
      };
      fetchPostData();
    }
  }, [postId]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      let response;
      if (postId) {
        // Edit mode: Send PUT request
        response = await axios.put(`/api/blog`, formData, {
          params: { id: postId }, // Pass the ID as a query parameter
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Add mode: Send POST request
        response = await axios.post("/api/blog", formData);
      }

      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setData(initialState);
        router.push("/admin/blogList"); // Redirect to posts page or any other page
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      method="POST"
      className="pt-5 px-5 sm:pl-16 sm:pt-12"
    >
      <p className="text-xl">Upload Thumbnail</p>
      <label htmlFor="image">
        <Image
          src={
            !image
              ? assets.upload_area
              : image instanceof File
              ? URL.createObjectURL(image)
              : image
          }
          width={140}
          height={70}
          alt=""
          className="mt-4"
        />
      </label>
      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        name="image"
        id="image"
        hidden
        // Only require image if adding a new post
        required={!postId}
      />
      <p className="text-xl mt-4">Blog Title</p>
      <input
        className="mt-2 w-full sm:w-[500px] px-4 py-3 border"
        type="text"
        name="title"
        id="title"
        placeholder="Type here"
        value={data.title}
        onChange={onChangeHandler}
        required
      />
      <p className="text-xl mt-4">Blog Description</p>
      <textarea
        className="mt-2 w-full sm:w-[500px] px-4 py-3 border"
        type="text"
        name="description"
        id="description"
        value={data.description}
        onChange={onChangeHandler}
        placeholder="Write content here"
        rows={6}
        required
      />
      <p className="text-xl mt-4">Blog Category</p>
      <select
        name="category"
        id="category"
        value={data.category}
        onChange={onChangeHandler}
        className="w-40 mt-4 px-4 py-3 border text-gray-500"
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
      <br />
      <button type="submit" className="w-40 h-12 mt-8 bg-black text-white">
        {postId ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default Main;
