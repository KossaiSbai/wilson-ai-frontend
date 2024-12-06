"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import { FaUpload, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const { data, error, isLoading, fetchData } = useFetch();

  const onClick = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await fetchData("/upload", "POST", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-[#FFFFFF] rounded-lg shadow-lg p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-[#333333] mb-2">
            Upload Contract File
          </h2>
          <p className="text-[#6C757D]">
            Select a PDF or Word document to upload for clause analysis.
          </p>
        </div>

        <div className="mb-6">
          <Label
            htmlFor="file"
            className="block text-[#333333] mb-2 font-medium"
          >
            Choose File
          </Label>
          <div className="flex items-center">
            <Input
              id="file"
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null;
                console.log("Selected File:", selectedFile);
                setFile(selectedFile);
              }}
              className="file-input flex-1 border border-[#EDEDF0] rounded-md px-4 py-2 bg-[#FFFFFF]"
            />
            {file && (
              <span className="ml-3 text-sm text-[#6C757D] truncate">
                {file.name}
              </span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Button
            onClick={onClick}
            disabled={isLoading || !file}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md ${
              isLoading
                ? "bg-[#D4D7E0] text-[#FFFFFF] cursor-not-allowed"
                : "bg-[#4A90E2] text-[#FFFFFF] hover:bg-[#357ABD]"
            }`}
          >
            <FaUpload />
            <span>{isLoading ? "Uploading..." : "Upload"}</span>
          </Button>
        </div>

        <div className="mt-4">
          {error && (
            <div className="flex items-center text-red-600">
              <FaExclamationCircle className="mr-2" />
              <span>Error: {error}</span>
            </div>
          )}
          {data ? (
            <div className="flex items-center text-green-600">
              <FaCheckCircle className="mr-2" />
              <span>Upload successful!</span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
