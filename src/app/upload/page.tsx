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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Upload Contract File
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Select a PDF or Word document to upload for clause analysis.
          </p>
        </div>

        <div className="mb-6">
          <Label
            htmlFor="file"
            className="block text-gray-700 dark:text-gray-200 mb-2"
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
              className="file-input flex-1"
            />
            {file && (
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                {file.name}
              </span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Button
            onClick={onClick}
            disabled={isLoading || !file}
            className="w-full flex items-center justify-center space-x-2"
          >
            <FaUpload />
            <span>{isLoading ? "Uploading..." : "Upload"}</span>
          </Button>
        </div>

        <div>
          {error && (
            <div className="flex items-center text-red-600 dark:text-red-400">
              <FaExclamationCircle className="mr-2" />
              <span>Error: {error}</span>
            </div>
          )}
          {data ? (
            <div className="flex items-center text-green-600 dark:text-green-400">
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
