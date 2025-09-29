import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileText, Download, Eye } from 'lucide-react';

interface ResumeData {
  name: string;
  currentRole: string;
  experience: string;
  skills: Array<{ name: string; level: number; category: string }>;
  education: string;
  certifications: string[];
  projects: string[];
}

interface FutureResumeGeneratorProps {
  resumeData: ResumeData;
}

interface FutureResume {
  title: string;
  targetRole: string;
  timeline: string;
  newSkills: string[];
  newProjects: string[];
  additionalCertifications: string[];
  description: string;
}

export function FutureResumeGenerator({ resumeData }: FutureResumeGeneratorProps) {
  const [selectedTimeline, setSelectedTimeline] = useState<string>("6months");
  const [selectedRole, setSelectedRole] = useState<string>("senior-frontend");
  const [previewMode, setPreviewMode] = useState(false);

  const futureResumes: Record<string, Record<string, FutureResume>> = {
    "6months": {
      "senior-frontend": {
        title: "Enhanced Frontend Specialist",
        targetRole: "Senior Frontend Developer",
        timeline: "6 months",
        newSkills: ["Next.js", "TypeScript Advanced", "Testing (Jest)", "Performance Optimization"],
        newProjects: ["E-commerce Platform with Next.js", "Component Library", "PWA Application"],
        additionalCertifications: ["React Certification", "Web Performance Optimization"],
        description: "Evolved into a senior frontend role with advanced React ecosystem knowledge"
      },
      "fullstack": {
        title: "Full Stack Developer",
        targetRole: "Full Stack Developer",
        timeline: "6 months",
        newSkills: ["Express.js", "MongoDB", "Docker", "JWT Authentication"],
        newProjects: ["Full Stack Social Platform", "RESTful API Development", "Microservices Architecture"],
        additionalCertifications: ["Node.js Certification", "MongoDB Professional"],
        description: "Expanded into full stack development with backend expertise"
      },
      "ui-developer": {
        title: "UI/UX Developer",
        targetRole: "UI/UX Developer",
        timeline: "6 months",
        newSkills: ["Design Systems", "User Research", "Prototyping", "Accessibility"],
        newProjects: ["Design System Implementation", "User Experience Audit", "Accessibility Compliance Project"],
        additionalCertifications: ["UX Design Certification", "Accessibility Specialist"],
        description: "Merged development skills with design expertise"
      }
    },
    "1year": {
      "senior-frontend": {
        title: "Frontend Architecture Lead",
        targetRole: "Principal Frontend Developer",
        timeline: "1 year",
        newSkills: ["Micro-frontends", "WebAssembly", "Advanced State Management", "Team Leadership"],
        newProjects: ["Micro-frontend Architecture", "Performance Dashboard", "Developer Tools"],
        additionalCertifications: ["Frontend Architecture", "Technical Leadership"],
        description: "Advanced to architecture and leadership roles in frontend development"
      },
      "fullstack": {
        title: "Senior Full Stack Engineer",
        targetRole: "Senior Full Stack Engineer",
        timeline: "1 year",
        newSkills: ["Kubernetes", "GraphQL", "Redis", "System Design", "DevOps"],
        newProjects: ["Scalable SaaS Platform", "Real-time Analytics Dashboard", "CI/CD Pipeline"],
        additionalCertifications: ["AWS Solutions Architect", "Kubernetes Administrator"],
        description: "Became a senior engineer with expertise in scalable systems"
      },
      "ui-developer": {
        title: "Senior UX Engineer",
        targetRole: "Senior UX Engineer",
        timeline: "1 year",
        newSkills: ["Design Leadership", "User Analytics", "A/B Testing", "Design Ops"],
        newProjects: ["User Experience Strategy", "Design System Leadership", "Product Analytics Platform"],
        additionalCertifications: ["Design Leadership", "Product Management"],
        description: "Advanced to senior UX engineering with product strategy focus"
      }
    },
    "2years": {
      "senior-frontend": {
        title: "Frontend Engineering Manager",
        targetRole: "Frontend Engineering Manager",
        timeline: "2 years",
        newSkills: ["Engineering Management", "Strategic Planning", "Mentoring", "Business Strategy"],
        newProjects: ["Team Scaling Initiative", "Technology Roadmap", "Developer Experience Platform"],
        additionalCertifications: ["Management Certification", "Strategic Leadership"],
        description: "Transitioned to engineering management with team leadership focus"
      },
      "fullstack": {
        title: "Technical Architect",
        targetRole: "Technical Architect",
        timeline: "2 years",
        newSkills: ["System Architecture", "Enterprise Patterns", "Technology Strategy", "Cross-team Collaboration"],
        newProjects: ["Enterprise Architecture Design", "Technology Migration", "Platform Strategy"],
        additionalCertifications: ["Enterprise Architecture", "Cloud Architecture"],
        description: "Evolved into technical architecture with enterprise-level expertise"
      },
      "ui-developer": {
        title: "Design Technology Director",
        targetRole: "Design Technology Director",
        timeline: "2 years",
        newSkills: ["Design Strategy", "Technology Integration", "Team Leadership", "Product Vision"],
        newProjects: ["Design Technology Vision", "Cross-functional Strategy", "Innovation Lab"],
        additionalCertifications: ["Design Strategy", "Technology Leadership"],
        description: "Advanced to director level with design and technology integration focus"
      }
    }
  };

  const currentResume = futureResumes[selectedTimeline]?.[selectedRole];

  const generateResumePreview = () => {
    if (!currentResume) return null;

    return (
      <div className="space-y-6 p-6 bg-white text-black border rounded-lg">
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold">{resumeData.name}</h1>
          <h2 className="text-xl text-gray-600 mt-1">{currentResume.targetRole}</h2>
          <p className="text-sm text-gray-500 mt-2">
            {resumeData.experience} → Enhanced with {currentResume.timeline} of focused development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Technical Skills</h3>
              <div className="space-y-1">
                {resumeData.skills.slice(0, 6).map(skill => (
                  <div key={skill.name} className="text-sm">• {skill.name}</div>
                ))}
                {currentResume.newSkills.map(skill => (
                  <div key={skill} className="text-sm text-blue-600">• {skill} (New)</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Certifications</h3>
              <div className="space-y-1">
                {resumeData.certifications.map(cert => (
                  <div key={cert} className="text-sm">• {cert}</div>
                ))}
                {currentResume.additionalCertifications.map(cert => (
                  <div key={cert} className="text-sm text-blue-600">• {cert} (New)</div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Projects</h3>
              <div className="space-y-1">
                {resumeData.projects.map(project => (
                  <div key={project} className="text-sm">• {project}</div>
                ))}
                {currentResume.newProjects.map(project => (
                  <div key={project} className="text-sm text-blue-600">• {project} (Future)</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Education</h3>
              <div className="text-sm">{resumeData.education}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Future Resume Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Career Timeline</label>
            <Select value={selectedTimeline} onValueChange={setSelectedTimeline}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
                <SelectItem value="2years">2 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Target Role</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="senior-frontend">Senior Frontend Developer</SelectItem>
                <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                <SelectItem value="ui-developer">UI/UX Developer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {currentResume && (
          <div className="space-y-4">
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4>{currentResume.title}</h4>
                    <Badge>{currentResume.timeline}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{currentResume.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                    <div>
                      <h5 className="text-xs font-medium mb-2">New Skills</h5>
                      <div className="flex flex-wrap gap-1">
                        {currentResume.newSkills.slice(0, 3).map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium mb-2">New Projects</h5>
                      <div className="text-xs text-muted-foreground">
                        {currentResume.newProjects.length} projects
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium mb-2">Certifications</h5>
                      <div className="text-xs text-muted-foreground">
                        {currentResume.additionalCertifications.length} new certifications
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {previewMode ? 'Hide Preview' : 'Preview Resume'}
              </Button>
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>

            {previewMode && (
              <div className="mt-6">
                {generateResumePreview()}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}