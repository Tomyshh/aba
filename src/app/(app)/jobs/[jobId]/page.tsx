import { JobDetails } from "@/components/jobs/job-details";

export default function JobPage({ params }: { params: { jobId: string } }) {
  const { jobId } = params;
  return (
    <div className="space-y-5">
      <JobDetails jobId={jobId} />
    </div>
  );
}


