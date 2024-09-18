import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function BlogTableItem({
  authorImg,
  title,
  author,
  date,
  deleteBlog,
  mongoId,
}) {
  const router = useRouter();

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4  font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={authorImg ? authorImg : assets.profile_icon}
          width={40}
          height={40}
          alt=""
        />
        <p>{author ? author : "No author"}</p>
      </th>

      <td className="px-6 py-4">
        <Link href={`/blogs/${mongoId}`}>{title ? title : "no title"}</Link>
      </td>

      <td className="px-6 py-4">{new Date(date).toDateString()}</td>
      <td
        className="px-3 py-4 cursor-pointer hover:text-black hover:font-semibold"
        onClick={() => router.push(`/admin/addBlog?id=${mongoId}`)}
      >
        Edit
      </td>
      <td
        className="pr-6 py-4 cursor-pointer hover:text-black hover:font-semibold"
        onClick={() => deleteBlog(mongoId)}
      >
        x
      </td>
    </tr>
  );
}

export default BlogTableItem;
