import { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface ResumeUploadProps {
  onResumeUpload: (resumeData: any) => void;
}

export function ResumeUpload({ onResumeUpload }: ResumeUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);

    // Simulate resume parsing with mock data
    setTimeout(() => {
      const mockResumeData = {
        name: "Alex Johnson",
        currentRole: "Frontend Developer",
        experience: "3 years",
        skills: [
          { name: "JavaScript", level: 85, category: "Programming" },
          { name: "React", level: 80, category: "Framework" },
          { name: "TypeScript", level: 75, category: "Programming" },
          { name: "CSS", level: 85, category: "Styling" },
          { name: "HTML", level: 90, category: "Markup" },
          { name: "Node.js", level: 65, category: "Backend" },
          { name: "Git", level: 80, category: "Tools" },
          { name: "Figma", level: 70, category: "Design" },
          { name: "SQL", level: 60, category: "Database" },
          { name: "REST APIs", level: 75, category: "Backend" }
        ],
        education: "Bachelor's in Computer Science",
        certifications: ["AWS Cloud Practitioner", "Google Analytics"],
        projects: [
          "E-commerce Platform",
          "Task Management App",
          "Portfolio Website"
        ]
      };

      onResumeUpload(mockResumeData);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <FileText className="h-6 w-6" />
          Upload Resume
        </CardTitle>
        <CardDescription>
          Upload your resume to analyze skills and explore career paths
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <label htmlFor="resume-upload" className="cursor-pointer">
              <span className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </span>
              <br />
              <span className="text-xs text-muted-foreground">
                PDF, DOC, or DOCX (max 10MB)
              </span>
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </div>

          {fileName && (
            <div className="text-sm text-center text-muted-foreground">
              {fileName}
            </div>
          )}

          {isUploading && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing resume...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}