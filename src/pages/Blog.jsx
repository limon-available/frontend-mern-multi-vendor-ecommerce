import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Top 10 Shopping Trends This Season",
      author: "Admin",
      date: "June 10, 2026",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=60",
      excerpt:
        "Discover the products and categories that shoppers are loving right now across our marketplace.",
    },
    {
      id: 2,
      title: "How to Choose the Right Vendor",
      author: "Admin",
      date: "June 5, 2026",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=60",
      excerpt:
        "A quick guide to evaluating vendor ratings, reviews and delivery times before you buy.",
    },
    {
      id: 3,
      title: "Smart Tips for Safe Online Payments",
      author: "Admin",
      date: "May 28, 2026",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=60",
      excerpt:
        "Learn how to keep your transactions secure while shopping across multiple online stores.",
    },
    {
      id: 4,
      title: "Building a Successful Online Shop",
      author: "Admin",
      date: "May 20, 2026",
      image:
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=60",
      excerpt:
        "Are you a seller? Here are proven strategies to grow your store and reach more customers.",
    },
    {
      id: 5,
      title: "The Future of Multi-Vendor Marketplaces",
      author: "Admin",
      date: "May 12, 2026",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=60",
      excerpt:
        "An overview of where ecommerce is heading and what it means for buyers and sellers alike.",
    },
    {
      id: 6,
      title: "Seasonal Sales: Make the Most of Them",
      author: "Admin",
      date: "May 1, 2026",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=60",
      excerpt:
        "Plan ahead and save big during our biggest seasonal sale events of the year.",
    },
  ];

  return (
    <div>
      <Header />
      <section className="bg-[#059473] h-[220px] mt-6 relative">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Blog</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Blog</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] mx-auto">
          <div className="grid grid-cols-3 md-lg:grid-cols-2 sm:grid-cols-1 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white border rounded-md overflow-hidden hover:shadow-md transition flex flex-col"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <FaRegUser /> {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegCalendarAlt /> {post.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-700">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    to="/blog"
                    className="text-[#059473] font-semibold text-sm hover:underline self-start"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
