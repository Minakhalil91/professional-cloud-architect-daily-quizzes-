
import { CaseStudy } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    name: 'EHR Healthcare',
    overview: 'A leading provider of electronic health record software, moving their legacy on-premise system to GCP.',
    businessGoals: ['Improve system uptime', 'Decrease operational overhead', 'Scalability for global expansion'],
    technicalRequirements: ['Hybrid connectivity', 'Data encryption at rest and in transit', 'Disaster recovery plan']
  },
  {
    name: 'Mountkirk Games',
    overview: 'An online gaming company building a new massive multiplayer online game.',
    businessGoals: ['Minimize latency', 'Support millions of concurrent players', 'Optimize compute costs'],
    technicalRequirements: ['Global load balancing', 'Autoscaling groups', 'Managed database services']
  },
  {
    name: 'TerramEarth',
    overview: 'A manufacturer of heavy equipment for agriculture and construction, shifting to IoT-driven insights.',
    businessGoals: ['Predictive maintenance', 'Data ingestion from millions of sensors', 'Dealer network insights'],
    technicalRequirements: ['High-throughput data ingestion', 'Machine learning pipelines', 'Long-term storage optimization']
  },
  {
    name: 'Helicopter Racing League',
    overview: 'A global sports league streaming races with real-time telemetry.',
    businessGoals: ['High-quality live streaming', 'Real-time fan engagement', 'Global reach'],
    technicalRequirements: ['Low-latency edge caching', 'Real-time analytics', 'Media transcoding']
  }
];

export const GCP_COLORS = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC04',
  green: '#34A853',
  bg: '#F8F9FA'
};
