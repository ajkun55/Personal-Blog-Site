import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";

function SideBar() {
  return (
    <div className="flex flex-col bg-slate-100">
      <Link href="/" className="px-2 py-4 sm:pl-14 border border-black">
        <Image src={assets.logo} width={120} alt="" />
      </Link>
      <div className="w-28 sm:w-80 h-[100vh] relative border border-black py-12">
        <div className="w-1/2 sm:w-4/5 absolute right-0">
          <Link
            href={"/admin/addBlog"}
            className="flex items-center border border-black gap-3 font-medium px-3 py-3 bg-white shadow-[-5px_5px_0_#000000]"
          >
            <Image src={assets.add_icon} width={28} alt="" />
            <p className="hover:text-black hover:font-semibold">Add Blogs</p>
          </Link>
          <Link
            href={"/admin/blogList"}
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-3 bg-white shadow-[-5px_5px_0_#000000]"
          >
            <Image src={assets.blog_icon} width={28} alt="" />
            <p className="hover:text-black hover:font-semibold">Blog List</p>
          </Link>
          <Link
            href={"/admin/subscriptions"}
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-3 bg-white shadow-[-5px_5px_0_#000000]"
          >
            <Image src={assets.email_icon} width={28} alt="" />
            <p className="hover:text-black hover:font-semibold">
              Subscriptions
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
