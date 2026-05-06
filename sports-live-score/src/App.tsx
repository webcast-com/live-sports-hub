import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import LiveScoresPage from "./pages/LiveScoresPage";
import UpcomingPage from "./pages/UpcomingPage";
import StandingsPage from "./pages/StandingsPage";
import NewsPage from "./pages/NewsPage";
import TopScorersPage from "./pages/TopScorersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/live-scores" element={<LiveScoresPage />} />
              <Route path="/upcoming" element={<UpcomingPage />} />
              <Route path="/standings" element={<StandingsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/top-scorers" element={<TopScorersPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
