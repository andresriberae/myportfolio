import { NextResponse } from "next/server";
import {prisma} from "@/libs/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    console.log(projects);
    return NextResponse.json(projects);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message},
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, imageUrl, repositoryUrl, projectUrl, tools, categories } =
      await request.json();

    // Inserta los datos, asegurándote de que los arrays sean en formato JSON
    const result = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        repositoryUrl,
        projectUrl,
        tools: JSON.stringify(tools),
        categories: JSON.stringify(categories),
      }
    });
    
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message},
        { status: 500 }
      );
    }
  }
}
