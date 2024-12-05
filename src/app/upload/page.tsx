"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";

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
    <div className="p-5 flex flex-col items-center">
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
        <Label htmlFor="file">File</Label>
        <Input
          id="file"
          type="file"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] || null;
            console.log("Selected File:", selectedFile);
            setFile(selectedFile);
          }}
        />
      </div>
      <Button onClick={onClick} disabled={isLoading || !file} className="mb-3">
        {isLoading ? "Uploading..." : "Upload"}
      </Button>
      {error && <p className="text-red-500">Error: {error}</p>}
      {data ? <p className="text-green-500">Upload successful!</p> : <></>}
    </div>
  );
}
