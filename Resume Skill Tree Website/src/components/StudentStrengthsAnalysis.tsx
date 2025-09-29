import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { TrendingUp, Brain, Heart, Zap, Target, ArrowRight, Star } from 'lucide-react';

interface Strength {
  subject?: string;
  trait?: string;
  level: number;
  category: string;
}

interface StudentStrengthsAnalysisProps {
  academicStrengths: Strength[];
  personalityTraits: Strength[];
  interests: string[];
  studentData: any;
}

interface CareerPath {
  title: string;
  description: string;
  matchPercentage: number;
  requiredStrengths: string[];
  suggestedSubjects: string[];
  timeframe: string;
  icon: React.ReactNode;
  colleges: string[];
  courses: string[];
  marketDemand: 'High' | 'Medium' | 'Growing';
}

export function StudentStrengthsAnalysis({ 
  academicStrengths, 
  personalityTraits, 
  interests, 
  studentData 
}: StudentStrengthsAnalysisProps) {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  const generateCareerPaths = (): CareerPath[] => {
    const paths: CareerPath[] = [];

    // Technology paths
    if (interests.includes('Technology & Programming') || 
        academicStrengths.some(s => s.subject === 'Mathematics' && s.level > 80)) {
      paths.push({
        title: "Software Engineer",
        description: "Design and develop software applications and systems",
        matchPercentage: 92,
        requiredStrengths: ["Mathematics", "Problem Solving", "Logic"],
        suggestedSubjects: ["Computer Science", "Mathematics", "Physics"],
        timeframe: "4-6 years",
        icon: <Zap className="h-5 w-5" />,
        colleges: ["MIT", "Stanford", "Carnegie Mellon", "UC Berkeley"],
        courses: ["Computer Science", "Software Engineering", "Data Science"],
        marketDemand: 'High'
      });
    }

    // Science paths
    if (interests.includes('Science & Research') || 
        academicStrengths.some(s => s.subject === 'Science' && s.level > 85)) {
      paths.push({
        title: "Biomedical Researcher",
        description: "Conduct research to advance medical knowledge and treatments",
        matchPercentage: 88,
        requiredStrengths: ["Science", "Research Skills", "Analytical Thinking"],
        suggestedSubjects: ["Biology", "Chemistry", "Mathematics", "Physics"],
        timeframe: "6-8 years",
        icon: <Brain className="h-5 w-5" />,
        colleges: ["Harvard", "Johns Hopkins", "Mayo Clinic College"],
        courses: ["Biomedical Sciences", "Molecular Biology", "Biochemistry"],
        marketDemand: 'Growing'
      });
    }

    // Business paths
    if (interests.includes('Business & Entrepreneurship') || 
        personalityTraits.some(t => t.trait === 'Leadership' && t.level > 80)) {
      paths.push({
        title: "Business Analyst",
        description: "Analyze business processes and recommend improvements",
        matchPercentage: 85,
        requiredStrengths: ["Leadership", "Communication", "Analytical Skills"],
        suggestedSubjects: ["Business Studies", "Economics", "Mathematics"],
        timeframe: "4-5 years",
        icon: <Target className="h-5 w-5" />,
        colleges: ["Wharton", "Harvard Business School", "INSEAD"],
        courses: ["Business Administration", "Economics", "Finance"],
        marketDemand: 'High'
      });
    }

    // Healthcare paths
    if (interests.includes('Healthcare & Medicine') || 
        academicStrengths.some(s => s.subject === 'Science' && s.level > 90)) {
      paths.push({
        title: "Medical Doctor",
        description: "Diagnose and treat patients, promote health and wellness",
        matchPercentage: 90,
        requiredStrengths: ["Science", "Empathy", "Problem Solving"],
        suggestedSubjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
        timeframe: "8-10 years",
        icon: <Heart className="h-5 w-5" />,
        colleges: ["Harvard Medical", "Johns Hopkins", "Mayo Medical School"],
        courses: ["Pre-Med", "Biology", "Chemistry", "MCAT Preparation"],
        marketDemand: 'High'
      });
    }

    // Creative paths
    if (interests.includes('Arts & Design') || 
        academicStrengths.some(s => s.subject === 'Arts' && s.level > 80)) {
      paths.push({
        title: "UX/UI Designer",
        description: "Design user experiences for digital products and applications",
        matchPercentage: 87,
        requiredStrengths: ["Creativity", "Visual Design", "Problem Solving"],
        suggestedSubjects: ["Art", "Computer Science", "Psychology"],
        timeframe: "3-4 years",
        icon: <Star className="h-5 w-5" />,
        colleges: ["RISD", "Parsons", "Art Center College of Design"],
        courses: ["Graphic Design", "HCI", "Digital Media"],
        marketDemand: 'Growing'
      });
    }

    return paths.sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const careerPaths = generateCareerPaths();

  const allStrengths = [...academicStrengths, ...personalityTraits];
  const strengthsByCategory = allStrengths.reduce((acc, strength) => {
    if (!acc[strength.category]) acc[strength.category] = [];
    acc[strength.category].push(strength);
    return acc;
  }, {} as Record<string, Strength[]>);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50";
    if (percentage >= 80) return "text-blue-600 bg-blue-50";
    return "text-yellow-600 bg-yellow-50";
  };

  const getDemandColor = (demand: string) => {
    if (demand === 'High') return "bg-green-100 text-green-800";
    if (demand === 'Growing') return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="space-y-6">
      {/* Student Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Your Strengths Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(strengthsByCategory).map(([category, categoryStrengths]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">{category} Strengths</h4>
                <div className="space-y-2">
                  {categoryStrengths.map((strength, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{strength.subject || strength.trait}</span>
                        <span className="text-xs text-muted-foreground">{strength.level}%</span>
                      </div>
                      <Progress value={strength.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium mb-3">Your Interests</h4>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge key={interest} variant="secondary">{interest}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Path Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recommended Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerPaths.map((path, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelectedPath(path)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{path.icon}</div>
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h4>{path.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={`${getMatchColor(path.matchPercentage)} border-0`}
                          >
                            {path.matchPercentage}% Match
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={getDemandColor(path.marketDemand)}
                          >
                            {path.marketDemand} Demand
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-xs font-medium mb-1">Required Strengths</h5>
                          <div className="flex flex-wrap gap-1">
                            {path.requiredStrengths.slice(0, 3).map((strength) => (
                              <Badge key={strength} variant="outline" className="text-xs">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-xs font-medium mb-1">Education Timeline</h5>
                          <span className="text-xs text-muted-foreground">{path.timeframe}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground ml-2" />
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
              {selectedPath.title} - Career Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Recommended Colleges</h4>
                  <div className="space-y-2">
                    {selectedPath.colleges.map((college) => (
                      <div key={college} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{college}</span>
                        <Badge variant="outline">Top Choice</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Suggested Courses</h4>
                  <div className="space-y-1">
                    {selectedPath.courses.map((course) => (
                      <div key={course} className="text-sm p-2 bg-muted/50 rounded">
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Subjects to Focus On</h4>
                  <div className="space-y-1">
                    {selectedPath.suggestedSubjects.map((subject) => (
                      <div key={subject} className="text-sm p-2 bg-blue-50 rounded">
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Market Outlook</h4>
                  <p className="text-sm text-muted-foreground">
                    This career has <strong>{selectedPath.marketDemand.toLowerCase()}</strong> market demand 
                    with excellent growth prospects in the coming years.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t mt-6">
              <Button className="w-full">
                Generate Detailed Learning Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}