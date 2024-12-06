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
    <div className="min-h-screen p-8 bg-[#e6e6e6] text-[#333333]">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold tracking-wide">{fileName}</h1>
        <p className="text-sm text-[#6C757D]">
          {clauses.length} clause{clauses.length !== 1 && "s"} found in this
          document
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
            activeTab === "all"
              ? "bg-[#4A90E2] text-white"
              : "bg-[#333333] text-white hover:bg-[#B0B0B0]"
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
                : "bg-[#333333] text-white hover:bg-[#B0B0B0]"
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
