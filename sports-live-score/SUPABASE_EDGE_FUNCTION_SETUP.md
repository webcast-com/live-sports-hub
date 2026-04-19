# Supabase Edge Function Setup Guide

This guide will help you deploy the `live-scores` Edge Function to your Supabase project.

## Prerequisites
- Supabase account with project: `jwpgggqcgnuvipnnmepr`
- RapidAPI account with API key for `free-api-live-football-data`

## Step 1: Get Your RapidAPI Key

1. Go to [RapidAPI](https://rapidapi.com)
2. Search for: "free-api-live-football-data"
3. Subscribe to the free tier
4. Copy your **API Key** from the dashboard

## Step 2: Deploy Edge Function

1. **Go to Supabase Dashboard**
   - Navigate to: https://app.supabase.com
   - Select your project: `jwpgggqcgnuvipnnmepr`

2. **Create New Edge Function**
   - Click **Edge Functions** in the left sidebar
   - Click **Create a new function**
   - Function name: `live-scores`
   - Copy the default code and replace it with the code below

## Step 3: Edge Function Code

Replace the default code with:

```typescript
// Edge function to proxy live football scores from RapidAPI and return JSON
console.info('live-scores function starting');

interface LiveMatch {
  id: number;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  status: 'live' | 'halftime' | 'final';
  homeColor: string;
  awayColor: string;
  homeAbbr: string;
  awayAbbr: string;
}

// Map RapidAPI response to LiveMatch format
function transformMatch(rawMatch: Record<string, unknown>): LiveMatch | null {
  try {
    const match = rawMatch as Record<string, unknown>;
    
    return {
      id: Math.random() * 10000 | 0,
      sport: 'football',
      league: (match.league as string) || (match.competition as string) || 'League',
      homeTeam: (match.home_team as string) || (match.homeTeam as string) || 'Home',
      awayTeam: (match.away_team as string) || (match.awayTeam as string) || 'Away',
      homeScore: Number(match.home_score || match.homeScore || match.home || 0),
      awayScore: Number(match.away_score || match.awayScore || match.away || 0),
      time: (match.time as string) || (match.status_short as string) || '0\'',
      status: getStatus(match.status as string),
      homeColor: '#003594',
      awayColor: '#004C54',
      homeAbbr: ((match.home_team as string) || '').slice(0, 3).toUpperCase(),
      awayAbbr: ((match.away_team as string) || '').slice(0, 3).toUpperCase(),
    };
  } catch (e) {
    console.error('Error transforming match:', e);
    return null;
  }
}

function getStatus(status: string): 'live' | 'halftime' | 'final' {
  if (!status) return 'live';
  const lower = status.toLowerCase();
  if (lower.includes('halftime') || status === 'HT') return 'halftime';
  if (lower.includes('final') || status === 'FT' || status === 'AET') return 'final';
  return 'live';
}

Deno.serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    console.info('live-scores: Received request');
    const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY');
    
    if (!RAPIDAPI_KEY) {
      console.error('live-scores: Missing RAPIDAPI_KEY environment variable');
      return new Response(
        JSON.stringify({ success: false, error: 'Missing RAPIDAPI_KEY' }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    const url = 'https://free-api-live-football-data.p.rapidapi.com/football-current-live';
    console.info('live-scores: Calling RapidAPI endpoint');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
    });

    const text = await response.text();
    console.info('live-scores: RapidAPI response status:', response.status);
    
    let rawData: unknown;
    try {
      rawData = JSON.parse(text);
    } catch (e) {
      console.error('live-scores: Failed to parse response:', text);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid response from RapidAPI' }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    // Transform RapidAPI response to our LiveMatch format
    let matches: LiveMatch[] = [];
    
    if (Array.isArray(rawData)) {
      matches = rawData
        .map(transformMatch)
        .filter((m): m is LiveMatch => m !== null);
    } else if (rawData && typeof rawData === 'object') {
      const obj = rawData as Record<string, unknown>;
      // Try different possible response structures
      const matchArray = 
        Array.isArray(obj.data) ? obj.data :
        Array.isArray(obj.matches) ? obj.matches :
        Array.isArray(obj.results) ? obj.results :
        Array.isArray(obj.match) ? obj.match :
        [obj];
      
      matches = matchArray
        .map(transformMatch)
        .filter((m): m is LiveMatch => m !== null);
    }

    console.info('live-scores: Transformed', matches.length, 'matches');

    return new Response(
      JSON.stringify({
        success: matches.length > 0,
        matches: matches.slice(0, 15), // Limit to 15 matches
        source: 'api-football',
      }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err) {
    console.error('live-scores: Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      }
    );
  }
});
```

## Step 4: Set Environment Variables

1. In Supabase Dashboard, go to **Settings → Secrets**
2. Click **Add Secret**
3. Create a new secret:
   - **Name**: `RAPIDAPI_KEY`
   - **Value**: (paste your RapidAPI key)
4. Click **Save**

## Step 5: Deploy

1. Click **Deploy** in the Supabase editor
2. Wait for the deployment to complete (usually 1-2 minutes)
3. You should see: "Function deployed successfully"

## Step 6: Test the Function

1. In Supabase, click your deployed `live-scores` function
2. Click the **Invoke** tab
3. Click **Send request**
4. You should see a response with live football matches

## Step 7: Verify Frontend Connection

1. Go back to your app at `/`
2. Open browser **DevTools** (F12)
3. Check the **Console** tab
4. Look for messages like:
   - `[Supabase] Connected successfully`
   - `[ScoreSimulator] Edge function response received`
5. The status indicator should change from "API unavailable" to "Live API Data"

## Troubleshooting

**If you see "API unavailable - using fallback":**
- Check the browser Console (F12) for error messages
- Verify RAPIDAPI_KEY is set in Supabase Secrets
- Check that the Edge Function deployed successfully
- Verify your RapidAPI subscription is active

**If the function doesn't return data:**
- Make sure RAPIDAPI_KEY is correct
- Test the RapidAPI endpoint directly at: https://rapidapi.com/api-sports/api/api-football
- Check Supabase function logs for errors

## Edge Function Logs

To view logs:
1. Go to **Edge Functions** in Supabase
2. Click your `live-scores` function
3. Click the **Logs** tab
4. Check for any errors

---

**Frontend repo**: This project is configured to use environment variables:
- `VITE_SUPABASE_URL`: https://jwpgggqcgnuvipnnmepr.supabase.co
- `VITE_SUPABASE_ANON_KEY`: (set in `.env`)
