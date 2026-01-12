import { JobDetails } from "@/components/jobs/job-details";

export default async function JobPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  return (
    <div className="space-y-5">
      <JobDetails jobId={jobId} />
    </div>
  );
}


