import { useState } from "react";
import { ClauseType, Clause, clauseTypeColors } from "@/types";
import ClauseCard from "@/components/custom/clause-card";

interface ContractClausesProps {
  fileName: string;
  clauses: Clause[];
}

export default function ContractClauses({
  fileName,
  clauses,
}: ContractClausesProps) {
  const [activeTab, setActiveTab] = useState<ClauseType | "all">("all");

  const groupedClauses = clauses.reduce((acc, clause) => {
    if (!acc[clause.type]) {
      acc[clause.type] = [];
    }
    acc[clause.type].push(clause);
    return acc;
  }, {} as Record<ClauseType, Clause[]>);

  const displayedClauses =
    activeTab === "all" ? clauses : groupedClauses[activeTab] || [];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 tracking-wide">
          {fileName}
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300">
          {clauses.length} clause{clauses.length !== 1 && "s"} found in this
          document
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
            activeTab === "all"
              ? "bg-blue-700 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Clauses ({clauses.length})
        </button>
        {Object.keys(groupedClauses).map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activeTab === type
                ? `${clauseTypeColors[type as ClauseType].bgColor} text-white`
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab(type as ClauseType)}
          >
            {type} ({groupedClauses[type as ClauseType].length})
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedClauses.map((clause, idx) => (
          <ClauseCard key={idx} clause={clause} />
        ))}
      </div>
    </div>
  );
}
