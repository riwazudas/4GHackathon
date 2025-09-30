import { useState } from 'react';
import { StudentDataInput } from './components/StudentDataInput';
import { StudentStrengthsAnalysis } from './components/StudentStrengthsAnalysis';
import { CollegeCareerRecommendations } from './components/CollegeCareerRecommendations';
import { MarketTrendsAnalysis } from './components/MarketTrendsAnalysis';
import { StudentPathwayPlanner } from './components/StudentPathwayPlanner';
import { DataSourceStatus } from './components/DataSourceStatus';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { GraduationCap, Brain, Target, TrendingUp, Star, Users, BookOpen, Lightbulb, Map } from 'lucide-react';

interface StudentData {
  name: string;
  grade: string;
  age: string;
  school: string;
  subjects: Record<string, string>;
  gpa: string;
  academicRank: string;
  clubs: string[];
  leadership: string[];
  interests: string[];
  careerAspiration: string;
  workStyle: string;
  teacherFeedback: {
    strengths: string;
    improvements: string;
    recommendations: string;
  };
  parentObservations: string;
  familyExpectations: string;
  academicStrengths: Array<{subject: string; level: number; category: string}>;
  personalityTraits: Array<{trait: string; level: number; category: string}>;
  profileCompleteness: number;
}

export default function App() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const handleDataSubmit = (data: StudentData) => {
    setStudentData(data);
  };

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Australian Student Career Guidance Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered career pathway analysis for Australian secondary students based on academic performance, interests, and market trends
            </p>
          </div>

          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Map className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                <CardTitle className="text-lg">Career Pathway</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Step-by-step personalized roadmap with actionable goals and milestones to achieve your career aspirations
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Brain className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <CardTitle className="text-lg">Strength Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive analysis of academic performance, extracurricular activities, and personal traits
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <GraduationCap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <CardTitle className="text-lg">University & TAFE Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Targeted university, TAFE, and apprenticeship recommendations aligned with your career goals
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <CardTitle className="text-lg">Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Real-time market trends and future skill demands in your areas of interest
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
                <CardTitle className="text-lg">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor your progress and stay motivated with visual indicators and achievement milestones
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Process Overview */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-2">Input Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Share your Year 10-12 results, co-curricular activities, interests, and feedback from teachers and parents
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="font-medium mb-2">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes your strengths, interests, and potential career matches
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium mb-2">Get Recommendations</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive personalised career paths, university/TAFE suggestions, and skill development plans
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium mb-2">Plan Your Future</h4>
                  <p className="text-sm text-muted-foreground">
                    Follow your customized roadmap with learning resources and milestones
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Section */}
          <StudentDataInput onDataSubmit={handleDataSubmit} />

          {/* Demo Section */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Want to see how it works? Try our demo with sample student data
            </p>
            <button
              onClick={() => {
                const demoData = {
                  name: "Alex Chen",
                  grade: "Year 11",
                  age: "16",
                  school: "Melbourne Secondary College",
                  subjects: {
                    mathematics: "A",
                    chemistry: "A+",
                    physics: "A",
                    english: "B+",
                    economics: "B",
                    informationTechnology: "A+"
                  },
                  gpa: "ATAR Est. 95+",
                  academicRank: "Top 10%",
                  clubs: ["Science Society", "Robotics Club", "Coding Club", "Debate Team"],
                  leadership: ["Science Society President", "Peer Tutor"],
                  interests: ["Technology & Programming", "Science & Research", "Engineering", "Innovation"],
                  careerAspiration: "Software Engineer or Data Scientist",
                  workStyle: "team",
                  teacherFeedback: {
                    strengths: "Exceptional analytical thinking, excellent in STEM subjects, natural leadership qualities",
                    improvements: "Could develop stronger presentation skills for university applications",
                    recommendations: "Consider Specialist Mathematics and Software Development for Year 12. Explore university early entry programs."
                  },
                  parentObservations: "Very curious about technology trends, spends time on coding projects and online courses",
                  familyExpectations: "Supportive of STEM career path, encourage university education",
                  academicStrengths: [
                    { subject: "Mathematics", level: 95, category: "Academic" },
                    { subject: "Chemistry", level: 98, category: "Academic" },
                    { subject: "Information Technology", level: 98, category: "Academic" },
                    { subject: "Physics", level: 95, category: "Academic" }
                  ],
                  personalityTraits: [
                    { trait: "Leadership", level: 90, category: "Personality" },
                    { trait: "Problem Solving", level: 95, category: "Personality" },
                    { trait: "Teamwork", level: 85, category: "Personality" },
                    { trait: "Innovation", level: 92, category: "Personality" }
                  ],
                  profileCompleteness: 95
                };
                handleDataSubmit(demoData);
              }}
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Try Demo with Sample Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Student Info */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{studentData.name}</h1>
              <p className="text-muted-foreground">
                {studentData.grade} • {studentData.school} • {studentData.gpa}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {studentData.profileCompleteness}% Profile Complete
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Lightbulb className="h-3 w-3" />
                {studentData.interests.length} Interest Areas
              </Badge>
              <button
                onClick={() => setStudentData(null)}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                New Assessment
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pathway" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pathway" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Career Pathway
            </TabsTrigger>
            <TabsTrigger value="strengths" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Strengths & Analysis
            </TabsTrigger>
            <TabsTrigger value="colleges" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Universities & Careers
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Market Trends
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Student Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pathway" className="space-y-6">
            <StudentPathwayPlanner studentData={studentData} />
          </TabsContent>

          <TabsContent value="strengths" className="space-y-6">
            <StudentStrengthsAnalysis 
              academicStrengths={studentData.academicStrengths}
              personalityTraits={studentData.personalityTraits}
              interests={studentData.interests}
              studentData={studentData}
            />
          </TabsContent>

          <TabsContent value="colleges" className="space-y-6">
            <CollegeCareerRecommendations studentData={studentData} />
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <MarketTrendsAnalysis studentInterests={studentData.interests} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            {/* Data Source Status */}
            <DataSourceStatus />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Subject Performance</h4>
                        <div className="space-y-2">
                          {Object.entries(studentData.subjects).map(([subject, grade]) => (
                            <div key={subject} className="flex justify-between items-center">
                              <span className="text-sm capitalize">{subject}</span>
                              <Badge variant={grade.includes('A') ? 'default' : 'secondary'}>
                                {grade}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Activities & Leadership</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-muted-foreground">Co-curricular Activities:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {studentData.clubs.slice(0, 3).map((club) => (
                                <Badge key={club} variant="outline" className="text-xs">
                                  {club}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {studentData.leadership.length > 0 && (
                            <div>
                              <span className="text-xs text-muted-foreground">Leadership:</span>
                              <div className="text-sm mt-1">{studentData.leadership.join(', ')}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feedback & Aspirations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Career Aspiration</h4>
                      <p className="text-sm text-muted-foreground">{studentData.careerAspiration}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Work Style Preference</h4>
                      <Badge variant="secondary">{studentData.workStyle}</Badge>
                    </div>
                    
                    {studentData.teacherFeedback.strengths && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Teacher Feedback</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-green-600 font-medium">Strengths:</span>
                            <p className="text-sm text-muted-foreground">{studentData.teacherFeedback.strengths}</p>
                          </div>
                          {studentData.teacherFeedback.improvements && (
                            <div>
                              <span className="text-xs text-yellow-600 font-medium">Growth Areas:</span>
                              <p className="text-sm text-muted-foreground">{studentData.teacherFeedback.improvements}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}