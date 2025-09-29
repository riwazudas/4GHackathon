import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: ['*'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
}))

app.use('*', logger(console.log))

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Health check endpoint
app.get('/make-server-6e9921eb/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Store student analysis results
app.post('/make-server-6e9921eb/student-analysis', async (c) => {
  try {
    const { studentId, analysisData } = await c.req.json()
    
    // Store in KV store with expiration
    await kv.set(`student_analysis_${studentId}`, analysisData)
    
    console.log(`Stored analysis for student: ${studentId}`)
    return c.json({ success: true, message: 'Analysis stored successfully' })
  } catch (error) {
    console.error('Error storing student analysis:', error)
    return c.json({ error: 'Failed to store analysis' }, 500)
  }
})

// Retrieve student analysis
app.get('/make-server-6e9921eb/student-analysis/:studentId', async (c) => {
  try {
    const studentId = c.req.param('studentId')
    const analysisData = await kv.get(`student_analysis_${studentId}`)
    
    if (!analysisData) {
      return c.json({ error: 'Analysis not found' }, 404)
    }
    
    return c.json({ success: true, data: analysisData })
  } catch (error) {
    console.error('Error retrieving student analysis:', error)
    return c.json({ error: 'Failed to retrieve analysis' }, 500)
  }
})

// Cache market trends data
app.post('/make-server-6e9921eb/cache-market-data', async (c) => {
  try {
    const { field, data } = await c.req.json()
    
    // Cache for 1 hour
    await kv.set(`market_trends_${field}`, {
      data,
      timestamp: Date.now(),
      ttl: 3600000 // 1 hour in milliseconds
    })
    
    return c.json({ success: true, message: 'Market data cached' })
  } catch (error) {
    console.error('Error caching market data:', error)
    return c.json({ error: 'Failed to cache market data' }, 500)
  }
})

// Get cached market trends
app.get('/make-server-6e9921eb/market-trends/:field', async (c) => {
  try {
    const field = c.req.param('field')
    const cachedData = await kv.get(`market_trends_${field}`)
    
    if (!cachedData) {
      return c.json({ error: 'No cached data found' }, 404)
    }
    
    // Check if data is still fresh (within TTL)
    const now = Date.now()
    const dataAge = now - cachedData.timestamp
    
    if (dataAge > cachedData.ttl) {
      // Data is stale, remove it
      await kv.del(`market_trends_${field}`)
      return c.json({ error: 'Cached data expired' }, 404)
    }
    
    return c.json({ success: true, data: cachedData.data })
  } catch (error) {
    console.error('Error retrieving cached market data:', error)
    return c.json({ error: 'Failed to retrieve cached data' }, 500)
  }
})

// Store user preferences and tracking
app.post('/make-server-6e9921eb/user-preferences', async (c) => {
  try {
    const { userId, preferences } = await c.req.json()
    
    await kv.set(`user_preferences_${userId}`, {
      ...preferences,
      lastUpdated: new Date().toISOString()
    })
    
    return c.json({ success: true, message: 'Preferences saved' })
  } catch (error) {
    console.error('Error saving user preferences:', error)
    return c.json({ error: 'Failed to save preferences' }, 500)
  }
})

// Get analytics data for administrators
app.get('/make-server-6e9921eb/analytics', async (c) => {
  try {
    // Get usage statistics
    const allKeys = await kv.getByPrefix('student_analysis_')
    const userPrefKeys = await kv.getByPrefix('user_preferences_')
    
    const analytics = {
      totalAnalyses: allKeys.length,
      totalUsers: userPrefKeys.length,
      lastWeekActivity: 0, // Could be enhanced with timestamp filtering
      popularFields: {}, // Could be enhanced with data aggregation
      timestamp: new Date().toISOString()
    }
    
    return c.json({ success: true, data: analytics })
  } catch (error) {
    console.error('Error retrieving analytics:', error)
    return c.json({ error: 'Failed to retrieve analytics' }, 500)
  }
})

// Error handling middleware
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ error: 'Internal server error', details: err.message }, 500)
})

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found' }, 404)
})

console.log('Student Career Guidance Server starting...')
Deno.serve(app.fetch)