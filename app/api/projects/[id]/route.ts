import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const project = await prisma.project.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!project) {
      return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request, 
  
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const deleteProject = await prisma.project.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(deleteProject);
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 });
      }
      return NextResponse.json({ message: `Error de base de datos: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PUT(request: Request, 
  
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const { title, description, imageUrl, repositoryUrl, projectUrl, tools, categories } =
      await request.json();

    const updateProject = await prisma.project.update({
      where: {
        id: Number(id),
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
    });

    return NextResponse.json(updateProject);
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 });
      }
      return NextResponse.json({ message: `Error de base de datos: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
