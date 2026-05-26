import { create } from "zustand";
import blogService from "../services/blogs.js";

const useBlogStore = create((set) => ({
  blogs: [],
  initializeBlogs: async () => {
    const blogs = await blogService.getAll();
    set({ blogs });
  },
  addBlog: async (blogObject) => {
    const newBlog = await blogService.create(blogObject);
    set((state) => ({
      blogs: [...state.blogs, newBlog],
    }));
    return newBlog;
  },
}));

export default useBlogStore;
