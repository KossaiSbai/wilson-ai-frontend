import { Badge } from "../ui/badge";
import { Clause, clauseTypeColors } from "@/types";

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
    <div className=" shadow-lg rounded-lg border border-gray-200 max-w-md mx-auto transform transition-transform hover:scale-105 my-8 h-96 overflow-scroll">
      <Badge
        className={`px-4 py-2 flex items-center justify-start gap-2 ${clauseTypeColors[type].badgeBgColor} hover:${clauseTypeColors[type].badgeBgColor}`}
      >
        <span
          className={`inline-block h-3 w-3 rounded-full ${clauseTypeColors[type].spanColor} animate-pulse`}
        ></span>
        <span
          className={`text-sm font-semibold uppercase ${clauseTypeColors[type].textColor}`}
        >
          {type}
        </span>
      </Badge>
      <div className="flex items-center justify-between text-sm text-gray-500 px-4 mt-2 py-2">
        <span className="font-semibold">Page:</span>
        <span>{page_number}</span>
      </div>
      <div className="px-4 pb-4 pt-1 space-y-3">
        <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
