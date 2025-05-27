// this route is used in the show task page to fetch all the tasks of a particular user
import { Task } from "@/lib/models/taskModel";
import { NextResponse } from "next/server";
import ConnectDB from "@/lib/db";

const loadDB = async () => {
  await ConnectDB()
}
loadDB()

export async function GET(request, { params }) {
  const { userid } = await params;

  try {

    const tasks = await Task.find({ userId: userid }); //as we have provided userId in the task model, we can use it to fetch tasks of a particular user

    return NextResponse.json({
      status: "success",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch tasks",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
