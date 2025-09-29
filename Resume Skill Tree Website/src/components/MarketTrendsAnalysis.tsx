import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { TrendingUp, TrendingDown, Brain, Zap, Target, Globe, Calendar, DollarSign } from 'lucide-react';

interface MarketTrendsAnalysisProps {
  studentInterests: string[];
}

interface Trend {
  field: string;
  growth: number;
  demand: 'High' | 'Medium' | 'Low' | 'Emerging';
  avgSalary: string;
  jobOpenings: number;
  futureOutlook: string;
  keySkills: string[];
  emergingRoles: string[];
  automation: number; // Risk of automation (0-100)
}

interface EmergingField {
  name: string;
  description: string;
  growthRate: string;
  skillsNeeded: string[];
  timeline: string;
  examples: string[];
  preparationTips: string[];
}

export function MarketTrendsAnalysis({ studentInterests }: MarketTrendsAnalysisProps) {
  const [selectedField, setSelectedField] = useState<string>('technology');

  const getMarketTrends = (): Record<string, Trend> => {
    return {
      technology: {
        field: "Technology & AI",
        growth: 25,
        demand: 'High',
        avgSalary: "$95,000 - $180,000",
        jobOpenings: 145000,
        futureOutlook: "Exponential growth expected with AI integration across all industries",
        keySkills: ["Machine Learning", "Cloud Computing", "Cybersecurity", "Data Analysis"],
        emergingRoles: ["AI Ethics Specialist", "Prompt Engineer", "Quantum Computing Developer"],
        automation: 15
      },
      healthcare: {
        field: "Healthcare & Biotechnology",
        growth: 18,
        demand: 'High',
        avgSalary: "$85,000 - $160,000",
        jobOpenings: 89000,
        futureOutlook: "Steady growth driven by aging population and medical advances",
        keySkills: ["Genomics", "Telemedicine", "Health Informatics", "Personalized Medicine"],
        emergingRoles: ["Genetic Counselor", "Health Data Analyst", "Telemedicine Specialist"],
        automation: 25
      },
      sustainability: {
        field: "Sustainability & Green Energy",
        growth: 22,
        demand: 'Emerging',
        avgSalary: "$75,000 - $140,000",
        jobOpenings: 67000,
        futureOutlook: "Rapid expansion as climate action becomes priority",
        keySkills: ["Renewable Energy", "Environmental Science", "Sustainability Strategy", "Carbon Management"],
        emergingRoles: ["Carbon Credit Analyst", "Sustainability Consultant", "Green Finance Specialist"],
        automation: 20
      },
      creative: {
        field: "Creative & Digital Media",
        growth: 12,
        demand: 'Medium',
        avgSalary: "$65,000 - $120,000",
        jobOpenings: 52000,
        futureOutlook: "Steady growth with digital transformation and content demand",
        keySkills: ["Digital Marketing", "Content Creation", "UX/UI Design", "Brand Strategy"],
        emergingRoles: ["Metaverse Designer", "Creator Economy Manager", "Digital Experience Architect"],
        automation: 35
      },
      business: {
        field: "Business & Entrepreneurship",
        growth: 15,
        demand: 'High',
        avgSalary: "$80,000 - $150,000",
        jobOpenings: 98000,
        futureOutlook: "Continuous demand with emphasis on digital transformation",
        keySkills: ["Data Analytics", "Digital Marketing", "Project Management", "Strategic Planning"],
        emergingRoles: ["Growth Hacker", "Business Intelligence Analyst", "Digital Transformation Manager"],
        automation: 30
      }
    };
  };

  const getEmergingFields = (): EmergingField[] => {
    return [
      {
        name: "Quantum Computing",
        description: "Revolutionary computing technology using quantum mechanics principles",
        growthRate: "200% over next 5 years",
        skillsNeeded: ["Physics", "Mathematics", "Computer Science", "Problem Solving"],
        timeline: "5-10 years to mainstream adoption",
        examples: ["Quantum Software Developer", "Quantum Research Scientist", "Quantum Security Analyst"],
        preparationTips: ["Strong foundation in physics and math", "Learn quantum programming languages", "Follow quantum research publications"]
      },
      {
        name: "Space Technology",
        description: "Commercial space exploration and satellite technology advancement",
        growthRate: "150% over next 5 years",
        skillsNeeded: ["Aerospace Engineering", "Materials Science", "Robotics", "Systems Design"],
        timeline: "3-7 years for various roles",
        examples: ["Spacecraft Engineer", "Mission Specialist", "Space Data Analyst"],
        preparationTips: ["Study aerospace engineering", "Gain experience with simulation software", "Follow space industry developments"]
      },
      {
        name: "Synthetic Biology",
        description: "Engineering biological systems for various applications",
        growthRate: "180% over next 5 years",
        skillsNeeded: ["Biology", "Engineering", "Computer Science", "Chemistry"],
        timeline: "4-8 years for specialized roles",
        examples: ["Biodesign Engineer", "Synthetic Biology Researcher", "Biotech Product Manager"],
        preparationTips: ["Strong biology and chemistry foundation", "Learn bioinformatics", "Understand bioethics"]
      },
      {
        name: "Digital Wellness",
        description: "Managing human well-being in an increasingly digital world",
        growthRate: "120% over next 5 years",
        skillsNeeded: ["Psychology", "Technology", "Health Sciences", "Communication"],
        timeline: "2-5 years for emerging roles",
        examples: ["Digital Wellness Coach", "Tech Ethics Specialist", "Digital Detox Consultant"],
        preparationTips: ["Study psychology and human behavior", "Understand technology impact", "Develop counseling skills"]
      }
    ];
  };

  const trends = getMarketTrends();
  const emergingFields = getEmergingFields();
  const currentTrend = trends[selectedField];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return "bg-green-100 text-green-800";
      case 'Medium': return "bg-yellow-100 text-yellow-800";
      case 'Emerging': return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAutomationRisk = (risk: number) => {
    if (risk < 30) return { color: "text-green-600", label: "Low Risk" };
    if (risk < 60) return { color: "text-yellow-600", label: "Medium Risk" };
    return { color: "text-red-600", label: "High Risk" };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Trends & Future Outlook
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Explore market demands and emerging opportunities in fields aligned with your interests
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
            {Object.entries(trends).map(([key, trend]) => (
              <Button
                key={key}
                variant={selectedField === key ? "default" : "outline"}
                onClick={() => setSelectedField(key)}
                className="text-xs h-auto py-2"
              >
                {trend.field.split(' & ')[0]}
              </Button>
            ))}
          </div>

          {currentTrend && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Growth Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{currentTrend.growth}%</p>
                  <p className="text-xs text-muted-foreground">Annual growth</p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Job Demand</span>
                  </div>
                  <Badge className={getDemandColor(currentTrend.demand)}>
                    {currentTrend.demand}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentTrend.jobOpenings.toLocaleString()} openings
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Salary Range</span>
                  </div>
                  <p className="text-sm font-semibold">{currentTrend.avgSalary}</p>
                  <p className="text-xs text-muted-foreground">Average range</p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">Automation Risk</span>
                  </div>
                  <p className={`text-sm font-semibold ${getAutomationRisk(currentTrend.automation).color}`}>
                    {getAutomationRisk(currentTrend.automation).label}
                  </p>
                  <Progress value={100 - currentTrend.automation} className="h-2 mt-1" />
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Future Outlook</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{currentTrend.futureOutlook}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">In-Demand Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentTrend.keySkills.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Emerging Roles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {currentTrend.emergingRoles.map((role) => (
                        <div key={role} className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">{role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Emerging Fields to Watch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {emergingFields.map((field, index) => (
              <Card key={index} className="border border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold">{field.name}</h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {field.growthRate}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{field.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-medium mb-1">Timeline to Mainstream</h4>
                      <p className="text-sm">{field.timeline}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium mb-2">Key Skills Needed</h4>
                      <div className="flex flex-wrap gap-1">
                        {field.skillsNeeded.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium mb-2">Example Roles</h4>
                      <div className="space-y-1">
                        {field.examples.slice(0, 2).map((example) => (
                          <div key={example} className="text-xs text-muted-foreground">
                            • {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Preparation Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-green-50">
                <h4 className="font-medium text-green-800 mb-2">Short-term (1-2 years)</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Build foundational skills</li>
                  <li>• Take relevant courses</li>
                  <li>• Join student organizations</li>
                  <li>• Start personal projects</li>
                </ul>
              </Card>
              
              <Card className="p-4 bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-2">Medium-term (3-5 years)</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Pursue higher education</li>
                  <li>• Gain practical experience</li>
                  <li>• Build professional network</li>
                  <li>• Specialize in emerging areas</li>
                </ul>
              </Card>
              
              <Card className="p-4 bg-purple-50">
                <h4 className="font-medium text-purple-800 mb-2">Long-term (5+ years)</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Become industry expert</li>
                  <li>• Lead innovation projects</li>
                  <li>• Mentor next generation</li>
                  <li>• Shape industry trends</li>
                </ul>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}