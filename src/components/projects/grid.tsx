import ProjectCard from "./project-card";


interface Props {
  projects: any[];
}

export default function ProjectsGrid({
  projects,
}: Props) {
  if (!projects.length) {
    return (
      <div className="border rounded-xl p-10 text-center">
        <h3 className="font-semibold">
          No Projects Yet
        </h3>

        <p className="text-muted-foreground mt-2">
          Create your first project.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project._id.toString()}
          project={project}
        />
      ))}
    </div>
  );
}