"use client";

import { Clause } from "@/types";
import ContractClauses from "@/components/custom/contract_clauses";
import useFetch from "@/hooks/useFetch";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { error, isLoading, fetchData } = useFetch();

  const [filenames, setFilenames] = useState<string[]>([]);
  const [filename, setFilename] = useState("");
  const [clauses, setClauses] = useState<Clause[]>([]);

  useEffect(() => {
    fetchData("/files", "GET").then((data) => {
      const filenames = data.map((file: never) => file[1]);
      setFilenames(filenames);
    });
  }, []);

  useEffect(() => {
    if (filename) {
      fetchData(`/clauses/${filename}`, "GET").then((data) => {
        setClauses(data);
      });
    }
  }, [filename]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleFilenameChange = (value: string) => {
    setFilename(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">
          Wilson Contract Clause Manager
        </h1>
        <p className="text-[#6C757D]">
          Select a file to view its clauses or upload a new contract.
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between bg-[#FFFFFF] p-6 rounded-lg shadow-md mb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <label htmlFor="file-selector" className="text-[#333333] font-medium">
            Select Contract:
          </label>
          <Select onValueChange={handleFilenameChange}>
            <SelectTrigger className="w-[220px] border border-[#EDEDF0] rounded-md text-[#333333] bg-[#FFFFFF]">
              <SelectValue placeholder="Choose a contract file..." />
            </SelectTrigger>
            <SelectContent>
              {filenames.map((filename, index) => (
                <SelectItem key={index} value={filename}>
                  {filename}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button
            asChild
            className="bg-[#333333] text-white px-4 py-2 rounded-lg hover:bg-[#357ABD] transition"
          >
            <Link href="/upload">Upload New Contract</Link>
          </Button>
        </div>
      </div>

      <div>
        {filename && clauses.length > 0 ? (
          <ContractClauses clauses={clauses} fileName={filename} />
        ) : (
          <div className="text-center text-[#6C757D] mt-12">
            Please select a file to view its clauses.
          </div>
        )}
      </div>
    </div>
  );
}
