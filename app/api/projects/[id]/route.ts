import { NextResponse } from "next/server";
import {Prisma} from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  id: string;
}

export async function GET(request: Request, context: {params:Params}) {
  const { params } = context;
  try {
    const {id} = await params;
    console.log("ID recibido:", params.id);

    const project = await prisma.project.findFirst({
      where: {
        id: parseInt(id, 10), 
      },
    });

    if (!project) {
      return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, context: {params:Params}) {
  const { params } = context;
  try {
    const {id} = await params;
    const deleteProject = await prisma.project.delete({
      where: {
        id: parseInt(id, 10), 
      }
    })

    if (!deleteProject) {
      return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 });
    }
    return NextResponse.json(deleteProject);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 });
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: Request, context: {params:Params}) {
  const { params } = context;
  try {
    const {id} = await params;
    const { title, description, imageUrl, repositoryUrl, projectUrl, tools, categories } =
      await request.json();

    const updateProject = await prisma.project.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        title,
        description,
        imageUrl,
        repositoryUrl,
        projectUrl,
        tools: JSON.stringify(tools),
        categories: JSON.stringify(categories),
      },
    })
    return NextResponse.json(updateProject);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 });
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
