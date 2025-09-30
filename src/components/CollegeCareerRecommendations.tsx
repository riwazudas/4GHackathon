import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';
import { GraduationCap, MapPin, DollarSign, Clock, TrendingUp, Star, BookOpen, Users, RefreshCw, AlertCircle } from 'lucide-react';
import ApiService from './services/ApiService';

interface StudentData {
  name: string;
  grade: string;
  interests: string[];
  academicStrengths: Array<{subject: string; level: number; category: string}>;
  gpa: string;
  careerAspiration: string;
}

interface CollegeCareerRecommendationsProps {
  studentData: StudentData;
}

interface College {
  name: string;
  location: string;
  ranking: number;
  acceptanceRate: string;
  tuition: string;
  matchScore: number;
  strengths: string[];
  programs: string[];
  campusLife: string;
}

interface Career {
  title: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  education: string;
  skills: string[];
  workEnvironment: string;
  matchScore: number;
}

interface LearningResource {
  title: string;
  type: 'Course' | 'Book' | 'Platform' | 'Certification';
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  description: string;
}

export function CollegeCareerRecommendations({ studentData }: CollegeCareerRecommendationsProps) {
  const [selectedTab, setSelectedTab] = useState('colleges');
  const [colleges, setColleges] = useState<College[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [learningResources, setLearningResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const apiService = ApiService.getInstance();
        
        // Fetch all data in parallel
        const [collegesData, careersData, resourcesData] = await Promise.all([
          apiService.fetchUniversityData(studentData),
          apiService.fetchCareerData(studentData.interests),
          apiService.fetchLearningResources(studentData.interests)
        ]);

        setColleges(collegesData);
        setCareers(careersData);
        setLearningResources(resourcesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recommendations');
        console.error('Recommendations fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentData]);

  const handleRefreshData = async () => {
    const apiService = ApiService.getInstance();
    setLoading(true);
    
    try {
      const [collegesData, careersData, resourcesData] = await Promise.all([
        apiService.fetchUniversityData(studentData),
        apiService.fetchCareerData(studentData.interests),
        apiService.fetchLearningResources(studentData.interests)
      ]);

      setColleges(collegesData);
      setCareers(careersData);
      setLearningResources(resourcesData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };



  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    return "text-yellow-600 bg-yellow-50";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Course': return <BookOpen className="h-4 w-4" />;
      case 'Book': return <BookOpen className="h-4 w-4" />;
      case 'Platform': return <Users className="h-4 w-4" />;
      case 'Certification': return <Star className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              <h2>Personalized Recommendations for {studentData.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Based on your interests in {studentData.interests.slice(0, 2).join(', ')} and your academic strengths
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshData}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </CardTitle>
        </CardHeader>
        {error && (
          <div className="mx-6 mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-800">{error}</span>
            </div>
          </div>
        )}
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colleges" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Colleges
          </TabsTrigger>
          <TabsTrigger value="careers" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Careers
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colleges" className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-64" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            colleges.map((college, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{college.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {college.location} • Ranking #{college.ranking}
                    </p>
                  </div>
                  <Badge className={`${getMatchColor(college.matchScore)} border-0`}>
                    {college.matchScore}% Match
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Acceptance: {college.acceptanceRate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Tuition: {college.tuition}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Top Programs Available</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recommended Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.programs.map((program) => (
                        <Badge key={program} variant="outline">{program}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Campus Life</h4>
                    <p className="text-sm text-muted-foreground">{college.campusLife}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="careers" className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            careers.map((career, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{career.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{career.description}</p>
                  </div>
                  <Badge className={`${getMatchColor(career.matchScore)} border-0`}>
                    {career.matchScore}% Match
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Salary: {career.averageSalary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Growth: {career.growthRate}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Education: {career.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Environment: {career.workEnvironment}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Key Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-5 w-48" />
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-3" />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-full mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningResources.map((resource, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <h3 className="font-medium">{resource.title}</h3>
                    </div>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Provider: {resource.provider}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{resource.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Duration: {resource.duration}</span>
                      <Badge variant="secondary" className="text-xs">{resource.level}</Badge>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}