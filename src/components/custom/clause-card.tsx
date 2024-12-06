import { Badge } from "@/components/ui/badge";
import { Clause, clauseTypeColors } from "@/types";
import { FaFileAlt, FaBook } from "react-icons/fa";

type ClauseCardProps = {
  clause: Clause;
};

export default function ClauseCard(props: ClauseCardProps) {
  const { clause } = props;

  const {
    text,
    metadata: { page_number },
    type,
  } = clause;

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200 max-w-lg mx-auto my-6 transform transition-transform hover:scale-105 hover:shadow-2xl">
      <Badge
        className={`px-4 py-2 flex items-center gap-3 ${clauseTypeColors[type].badgeBgColor}`}
      >
        <span
          className={`inline-block h-3 w-3 rounded-full ${clauseTypeColors[type].spanColor}`}
        ></span>
        <span
          className={`text-sm font-semibold uppercase ${clauseTypeColors[type].textColor}`}
        >
          {type}
        </span>
      </Badge>

      <div className="flex justify-between px-6 py-2 bg-gray-50 border-t border-b">
        <div className="flex items-center text-gray-600 text-sm">
          <FaFileAlt className="mr-1" />
          <span>
            <span className="font-semibold">Page:</span> {page_number}
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <FaBook className="mr-1" />
          <span>
            <span className="font-semibold">Type:</span> {type}
          </span>
        </div>
      </div>

      <div className="px-6 py-4">
        <p className="text-gray-700 text-sm leading-relaxed transition-all duration-300 max-h-36 overflow-scroll">
          {text}
        </p>
      </div>
    </div>
  );
}
