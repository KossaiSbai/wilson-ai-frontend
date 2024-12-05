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
      console.log("DATA", data);
      const filenames = data.map((file: never) => file[1]);
      setFilenames(filenames);
    });
  }, []);

  useEffect(() => {
    console.log("FILENAME", filename);
    if (filename) {
      fetchData(`/clauses/${filename}`, "GET").then((data) => {
        console.log("CLAUSES", data);
        setClauses(data);
      });
    }
  }, [filename]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleFilenameChange = (value: string) => {
    setFilename(value);
  };

  console.log(error);

  return (
    <div className="p-5">
      <div className="flex flex-row justify-between">
        <Select onValueChange={handleFilenameChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filename" />
          </SelectTrigger>
          <SelectContent>
            {filenames.map((filename, index) => (
              <SelectItem key={index} value={filename}>
                {filename}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button asChild>
          <Link href="/upload">Upload Contract</Link>
        </Button>
      </div>
      {filename && clauses && (
        <ContractClauses clauses={clauses} fileName={filename} />
      )}
    </div>
  );
}
