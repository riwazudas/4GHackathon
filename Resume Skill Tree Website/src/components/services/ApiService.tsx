// API Service for fetching real market trends and university data
interface MarketTrendData {
  field: string;
  growth: number;
  demand: 'High' | 'Medium' | 'Low' | 'Emerging';
  avgSalary: string;
  jobOpenings: number;
  futureOutlook: string;
  keySkills: string[];
  emergingRoles: string[];
  automation: number;
  source: string;
}

interface UniversityData {
  name: string;
  location: string;
  ranking: number;
  acceptanceRate: string;
  tuition: string;
  matchScore: number;
  strengths: string[];
  programs: string[];
  campusLife: string;
  admissionRequirements: {
    gpa: number;
    satScore?: number;
    actScore?: number;
    requiredCourses: string[];
  };
}

interface CareerData {
  title: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  education: string;
  skills: string[];
  workEnvironment: string;
  matchScore: number;
  industryOutlook: string;
  certifications: string[];
}

class ApiService {
  private static instance: ApiService;
  private baseUrl = 'https://api.example.com'; // This would be replaced with real API endpoints
  private serverUrl: string;

  constructor() {
    // Import project info for server communication
    import('../../utils/supabase/info').then(({ projectId }) => {
      this.serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6e9921eb`;
    });
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Bureau of Labor Statistics API for job market data
  async fetchJobMarketTrends(field: string): Promise<MarketTrendData[]> {
    try {
      // First, try to get cached data from our server
      if (this.serverUrl) {
        try {
          const cachedResponse = await fetch(`${this.serverUrl}/market-trends/${field}`, {
            headers: {
              'Authorization': `Bearer ${await this.getPublicAnonKey()}`
            }
          });
          
          if (cachedResponse.ok) {
            const cachedData = await cachedResponse.json();
            console.log('Using cached market trends data');
            return [cachedData.data];
          }
        } catch (cacheError) {
          console.log('No cached data available, fetching fresh data');
        }
      }
      
      // Mock implementation - In production, this would call BLS API
      // Example: https://api.bls.gov/publicAPI/v2/timeseries/data/
      
      const mockResponse = await this.simulateApiCall({
        technology: {
          field: "Technology & AI",
          growth: 25,
          demand: 'High' as const,
          avgSalary: "$95,000 - $180,000",
          jobOpenings: 145000,
          futureOutlook: "Exponential growth expected with AI integration across all industries",
          keySkills: ["Machine Learning", "Cloud Computing", "Cybersecurity", "Data Analysis"],
          emergingRoles: ["AI Ethics Specialist", "Prompt Engineer", "Quantum Computing Developer"],
          automation: 15,
          source: "Bureau of Labor Statistics"
        },
        healthcare: {
          field: "Healthcare & Biotechnology",
          growth: 18,
          demand: 'High' as const,
          avgSalary: "$85,000 - $160,000",
          jobOpenings: 89000,
          futureOutlook: "Steady growth driven by aging population and medical advances",
          keySkills: ["Genomics", "Telemedicine", "Health Informatics", "Personalized Medicine"],
          emergingRoles: ["Genetic Counselor", "Health Data Analyst", "Telemedicine Specialist"],
          automation: 25,
          source: "Bureau of Labor Statistics"
        }
      });

      const trendData = mockResponse[field] || mockResponse.technology;
      
      // Cache the fresh data
      if (this.serverUrl) {
        try {
          await fetch(`${this.serverUrl}/cache-market-data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${await this.getPublicAnonKey()}`
            },
            body: JSON.stringify({ field, data: trendData })
          });
        } catch (cacheError) {
          console.log('Failed to cache market data:', cacheError);
        }
      }
      
      return [trendData];
    } catch (error) {
      console.error('Error fetching job market trends:', error);
      throw new Error('Failed to fetch market trends data');
    }
  }

  // College Scorecard API for university data
  async fetchUniversityData(studentProfile: any): Promise<UniversityData[]> {
    try {
      // Mock implementation - In production, this would call College Scorecard API
      // Example: https://api.data.gov/ed/collegescorecard/v1/schools
      
      const mockUniversities: UniversityData[] = [
        {
          name: "Massachusetts Institute of Technology",
          location: "Cambridge, MA",
          ranking: 1,
          acceptanceRate: "7%",
          tuition: "$53,450",
          matchScore: this.calculateMatchScore(studentProfile, "MIT"),
          strengths: ["Engineering", "Computer Science", "Research"],
          programs: ["Computer Science", "Electrical Engineering", "Aerospace Engineering"],
          campusLife: "Highly collaborative, innovation-focused environment",
          admissionRequirements: {
            gpa: 4.0,
            satScore: 1520,
            actScore: 34,
            requiredCourses: ["Mathematics", "Science", "English"]
          }
        },
        {
          name: "Stanford University",
          location: "Stanford, CA",
          ranking: 2,
          acceptanceRate: "4%",
          tuition: "$56,169",
          matchScore: this.calculateMatchScore(studentProfile, "Stanford"),
          strengths: ["Technology", "Entrepreneurship", "Research"],
          programs: ["Computer Science", "Engineering", "Business"],
          campusLife: "Entrepreneurial spirit, beautiful campus, diverse student body",
          admissionRequirements: {
            gpa: 4.0,
            satScore: 1510,
            actScore: 34,
            requiredCourses: ["Mathematics", "Science", "English", "Social Studies"]
          }
        }
      ];

      await this.simulateApiCall(null, 1000); // Simulate API delay
      return mockUniversities.sort((a, b) => b.matchScore - a.matchScore);
    } catch (error) {
      console.error('Error fetching university data:', error);
      throw new Error('Failed to fetch university data');
    }
  }

  // O*NET API for career information
  async fetchCareerData(interests: string[]): Promise<CareerData[]> {
    try {
      // Mock implementation - In production, this would call O*NET API
      // Example: https://services.onetcenter.org/ws/
      
      const careerDatabase: Record<string, CareerData[]> = {
        "Technology & Programming": [
          {
            title: "Software Engineer",
            description: "Design, develop, and maintain software applications and systems",
            averageSalary: "$105,000 - $180,000",
            growthRate: "25% (Much faster than average)",
            education: "Bachelor's in Computer Science or related field",
            skills: ["Programming", "Problem Solving", "System Design", "Collaboration"],
            workEnvironment: "Tech companies, startups, remote work options",
            matchScore: 94,
            industryOutlook: "Excellent growth prospects with increasing digitization",
            certifications: ["AWS Certified", "Google Cloud Professional", "Microsoft Azure"]
          }
        ],
        "Science & Research": [
          {
            title: "Data Scientist",
            description: "Analyze complex data to help organizations make informed decisions",
            averageSalary: "$95,000 - $165,000",
            growthRate: "35% (Much faster than average)",
            education: "Bachelor's/Master's in Data Science, Statistics, or Computer Science",
            skills: ["Statistics", "Programming", "Machine Learning", "Communication"],
            workEnvironment: "Various industries, research institutions, consulting",
            matchScore: 89,
            industryOutlook: "High demand across all sectors",
            certifications: ["Certified Analytics Professional", "SAS Certified", "Tableau Desktop"]
          }
        ]
      };

      const relevantCareers: CareerData[] = [];
      interests.forEach(interest => {
        if (careerDatabase[interest]) {
          relevantCareers.push(...careerDatabase[interest]);
        }
      });

      await this.simulateApiCall(null, 800);
      return relevantCareers.sort((a, b) => b.matchScore - a.matchScore);
    } catch (error) {
      console.error('Error fetching career data:', error);
      throw new Error('Failed to fetch career data');
    }
  }

  // News API for latest industry trends
  async fetchIndustryNews(field: string): Promise<any[]> {
    try {
      // Mock implementation - In production, this would call News API
      // Example: https://newsapi.org/v2/everything?q=${field}
      
      const mockNews = [
        {
          title: "AI Revolutionizes Healthcare Diagnosis",
          summary: "Machine learning algorithms show 95% accuracy in early disease detection",
          source: "TechHealth Today",
          date: "2024-01-15",
          relevance: "High"
        },
        {
          title: "Green Energy Jobs Surge 40% This Year",
          summary: "Renewable energy sector creates thousands of new positions",
          source: "Energy Career News",
          date: "2024-01-10",
          relevance: "Medium"
        }
      ];

      await this.simulateApiCall(null, 500);
      return mockNews;
    } catch (error) {
      console.error('Error fetching industry news:', error);
      return [];
    }
  }

  // LinkedIn Learning API for course recommendations
  async fetchLearningResources(skills: string[]): Promise<any[]> {
    try {
      // Mock implementation - In production, this would call educational platform APIs
      const mockResources = [
        {
          title: "Advanced Machine Learning Specialization",
          provider: "Coursera - Stanford University",
          duration: "6 months",
          level: "Advanced",
          rating: 4.8,
          skills: skills.slice(0, 3),
          price: "$49/month",
          certification: true
        },
        {
          title: "Full Stack Web Development Bootcamp",
          provider: "Udemy",
          duration: "12 weeks",
          level: "Intermediate",
          rating: 4.6,
          skills: ["JavaScript", "React", "Node.js"],
          price: "$89.99",
          certification: true
        }
      ];

      await this.simulateApiCall(null, 600);
      return mockResources;
    } catch (error) {
      console.error('Error fetching learning resources:', error);
      return [];
    }
  }

  // Salary data from Glassdoor/PayScale APIs
  async fetchSalaryData(jobTitle: string, location: string): Promise<any> {
    try {
      // Mock implementation - In production, this would call salary APIs
      const mockSalaryData = {
        jobTitle,
        location,
        averageSalary: "$95,000",
        salaryRange: "$75,000 - $130,000",
        experienceLevel: "Mid-level",
        topPayingCompanies: ["Google", "Microsoft", "Apple"],
        benefits: ["Health Insurance", "401k", "Stock Options"],
        lastUpdated: "2024-01-15"
      };

      await this.simulateApiCall(null, 400);
      return mockSalaryData;
    } catch (error) {
      console.error('Error fetching salary data:', error);
      throw new Error('Failed to fetch salary data');
    }
  }

  private calculateMatchScore(studentProfile: any, university: string): number {
    // Simple matching algorithm - in production this would be more sophisticated
    let score = 60; // Base score

    // Academic performance boost
    if (parseFloat(studentProfile?.gpa || "3.0") >= 3.8) score += 20;
    if (parseFloat(studentProfile?.gpa || "3.0") >= 3.5) score += 10;

    // Interest alignment
    if (studentProfile?.interests?.includes("Technology & Programming")) score += 15;
    if (studentProfile?.interests?.includes("Science & Research")) score += 10;

    // Leadership activities
    if (studentProfile?.leadership?.length > 0) score += 10;

    // Random variation for different universities
    const universityModifier = university === "MIT" ? 5 : university === "Stanford" ? 3 : 0;
    score += universityModifier;

    return Math.min(score, 100);
  }

  private async simulateApiCall(data: any, delay: number = 1000): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delay);
    });
  }

  private async getPublicAnonKey(): Promise<string> {
    try {
      const { publicAnonKey } = await import('../../utils/supabase/info');
      return publicAnonKey;
    } catch (error) {
      console.error('Failed to get public anon key:', error);
      return '';
    }
  }

  // Real-time market conditions
  async fetchMarketConditions(): Promise<any> {
    try {
      const mockMarketData = {
        economicIndicators: {
          gdpGrowth: 2.3,
          unemploymentRate: 3.7,
          inflationRate: 3.2
        },
        hotSkills: [
          { skill: "Artificial Intelligence", demand: "Very High", growth: "+45%" },
          { skill: "Cloud Computing", demand: "High", growth: "+32%" },
          { skill: "Cybersecurity", demand: "High", growth: "+28%" }
        ],
        emergingIndustries: [
          "Quantum Computing",
          "Sustainable Technology",
          "Space Technology",
          "Synthetic Biology"
        ],
        lastUpdated: new Date().toISOString()
      };

      await this.simulateApiCall(null, 300);
      return mockMarketData;
    } catch (error) {
      console.error('Error fetching market conditions:', error);
      throw new Error('Failed to fetch market conditions');
    }
  }
}

export default ApiService;