import { Metadata } from "next";

type Props = {
  params: {
    projectId: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Project ${params.projectId}`,
    description: `Esta es la descripción del Proyecto ${params.projectId}`,
  };
};

export default function ProjectDetail({ params }: Props) {
  return <h1>Proyecto {params.projectId}</h1>;
}
