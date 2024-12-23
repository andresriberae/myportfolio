import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

// Cambié el tipo Params y cómo se usa el segundo argumento
export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params; // Ahora se usa context.params para obtener el id

    console.log("ID recibido:", id);

    const project = await prisma.project.findFirst({
      where: {
        id: Number(id), // Convertir el id a un número
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

export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params; // Se usa context.params para obtener el id

    const deleteProject = await prisma.project.delete({
      where: {
        id: Number(id), // Convertir el id a un número
      },
    });

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

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params; // Accedemos a context.params

    const { title, description, imageUrl, repositoryUrl, projectUrl, tools, categories } =
      await request.json();

    const updateProject = await prisma.project.update({
      where: {
        id: Number(id), // Convertir el id a un número
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 });
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
