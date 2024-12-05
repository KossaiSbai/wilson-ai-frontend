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
  const groupedClauses = clauses.reduce((acc, clause) => {
    if (!acc[clause.type]) {
      acc[clause.type] = [];
    }
    acc[clause.type].push(clause);
    return acc;
  }, {} as Record<ClauseType, Clause[]>);

  return (
    <div className="min-h-screen p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          {fileName}
        </h1>
        <p className="text-md text-gray-600">
          {clauses.length} clause{clauses.length !== 1 && "s"} found in this
          document
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {Object.entries(groupedClauses).map(([type, clausesOfType]) => (
          <div key={type} className="mb-8">
            <div
              className={`flex items-center p-4 rounded-lg shadow-md bg-opacity-20 `}
            >
              <span
                className={`text-${
                  clauseTypeColors[type as ClauseType].textColor
                } mr-4`}
              >
                {clauseTypeColors[type as ClauseType].icon}
              </span>
              <h2 className="text-xl font-semibold text-gray-800">
                {type} ({clausesOfType.length})
              </h2>
            </div>

            <div className="mt-4 space-y-4">
              {clausesOfType.map((clause, idx) => (
                <ClauseCard key={idx} clause={clause} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
