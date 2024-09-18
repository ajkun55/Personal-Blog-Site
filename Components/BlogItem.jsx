import Image from "next/image";
import { assets } from "@/Assets/assets";
import Link from "next/link";

function BlogItem({ blog }) {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0_#000000]">
      <Link href={`/blogs/${blog._id}`}>
        <Image
          src={blog.image}
          alt=""
          width={400}
          height={400}
          className="border-b border-black"
        />
      </Link>
      <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">
        {blog.category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {blog.title}
        </h5>
        <p
          className="mb-3 text-sm tracking-tight text-gray-700"
          dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 120) }}
        ></p>
        <Link
          href={`/blogs/${blog._id}`}
          className="inline-flex items-center py-2 font-semibold text-center"
        >
          Read More
          <Image src={assets.arrow} width={12} alt="" className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

export default BlogItem;
