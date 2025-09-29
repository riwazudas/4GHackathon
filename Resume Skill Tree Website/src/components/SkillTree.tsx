import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ChevronRight, Target, TrendingUp, Zap } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillTreeProps {
  skills: Skill[];
}

interface CareerPath {
  title: string;
  description: string;
  requiredSkills: string[];
  suggestedSkills: string[];
  timeframe: string;
  icon: React.ReactNode;
}

export function SkillTree({ skills }: SkillTreeProps) {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  const careerPaths: CareerPath[] = [
    {
      title: "Senior Frontend Developer",
      description: "Advance your frontend expertise with advanced frameworks and architecture",
      requiredSkills: ["React", "TypeScript", "CSS"],
      suggestedSkills: ["Next.js", "GraphQL", "Testing", "Performance Optimization"],
      timeframe: "6-12 months",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "Full Stack Developer",
      description: "Expand into backend development for complete web applications",
      requiredSkills: ["JavaScript", "Node.js", "SQL"],
      suggestedSkills: ["Express.js", "MongoDB", "Docker", "AWS"],
      timeframe: "8-15 months",
      icon: <Target className="h-5 w-5" />
    },
    {
      title: "UX/UI Developer",
      description: "Combine development skills with design expertise",
      requiredSkills: ["HTML", "CSS", "Figma"],
      suggestedSkills: ["User Research", "Prototyping", "Design Systems", "Accessibility"],
      timeframe: "4-8 months",
      icon: <Zap className="h-5 w-5" />
    }
  ];

  const getSkillColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSkillLevel = (skillName: string) => {
    const skill = skills.find(s => s.name.toLowerCase().includes(skillName.toLowerCase()));
    return skill?.level || 0;
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      {/* Current Skills Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Current Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">{category}</h4>
                <div className="space-y-2">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Career Paths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {careerPaths.map((path, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                   onClick={() => setSelectedPath(path)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{path.icon}</div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h4>{path.title}</h4>
                        <Badge variant="outline">{path.timeframe}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {path.requiredSkills.map((skill) => {
                          const level = getSkillLevel(skill);
                          return (
                            <Badge 
                              key={skill} 
                              variant={level >= 70 ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {skill} {level > 0 && `(${level}%)`}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground ml-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Path Details */}
      {selectedPath && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedPath.icon}
              {selectedPath.title} - Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Skills to Develop</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedPath.suggestedSkills.map((skill) => (
                    <div key={skill} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{skill}</span>
                      <Badge variant="outline">Learn</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button className="w-full">Generate Learning Roadmap</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}