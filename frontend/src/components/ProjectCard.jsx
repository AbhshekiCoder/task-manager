import { useNavigate } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white/10 p-6 rounded-2xl hover:scale-105 transition cursor-pointer" onClick={() => navigate(`/projects/${project.id}/tasks`)}>
      <h2 className="text-xl font-semibold">{project.name}</h2>
    </div>
  );
}