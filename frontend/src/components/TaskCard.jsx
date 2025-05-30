export default function TaskCard({ task }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition border-l-4 border-orange">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-darkOrange">{task.title}</h3>
        <span className="text-sm bg-orange text-white px-3 py-1 rounded-full">{task.status}</span>
      </div>
      <p className="text-sm text-gray-700 mb-2">{task.description}</p>
      <div className="text-xs text-gray-500">
        Created: {task.createdAt} <br />
        {task.completedAt && <>Completed: {task.completedAt}</>}
      </div>
    </div>
  );
}