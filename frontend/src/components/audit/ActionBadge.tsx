interface Props {
  action: string;
}

export default function ActionBadge({ action }: Props) {
  const getClass = () => {
    switch (action) {
      case "RESULT_COMPUTED":
        return "bg-green-100 text-green-700";

      case "RESULT_UPDATED":
        return "bg-yellow-100 text-yellow-700";

      case "STUDENT_CREATED":
        return "bg-blue-100 text-blue-700";

      case "STUDENT_PROMOTED":
        return "bg-purple-100 text-purple-700";

      case "COURSE_CREATED":
        return "bg-indigo-100 text-indigo-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${getClass()}`}
    >
      {action}
    </span>
  );
}
