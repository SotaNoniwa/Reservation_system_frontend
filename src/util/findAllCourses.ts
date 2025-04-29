import axios from "axios";
import { Course } from "../lib/Course";

export async function findAllCourses(): Promise<Course[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get<Course[]>(
    "http://localhost:8080/api/user/courses",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
