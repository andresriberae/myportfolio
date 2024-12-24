import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}
export async function GET(
  request: NextRequest,
  {params}: Params
) {
  try {
    // const { id } = context.params;

    const project = await prisma.project.findFirst({
      where: {
        id: Number(params.id),
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
  {params}: Params
) {
  try {
    // const { id } = context.params;
    const deleteProject = await prisma.project.delete({
      where: {
        id: Number(params.id),
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
  {params}: Params
) {
  console.log(params.id);
  try {
    // const { id } = context.params;
    const { title, description, imageUrl, repositoryUrl, projectUrl, tools, categories } =
      await request.json();


    const updateProject = await prisma.project.update({
      where: {
        id: Number(params.id),
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