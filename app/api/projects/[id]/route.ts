import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id  = (await params).id;

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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const deleteProject = await prisma.project.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(deleteProject);
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
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
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}