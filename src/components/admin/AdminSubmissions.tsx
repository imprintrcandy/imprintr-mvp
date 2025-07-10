import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, Flag, Eye, Image, Video, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProofSubmission {
  id: string;
  proof_type: string;
  proof_url: string | null;
  story: string | null;
  status: string;
  submitted_at: string;
  challenge: {
    title: string;
  } | null;
  user: {
    name: string;
    email: string;
  } | null;
}

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState<ProofSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ProofSubmission | null>(null);
  const [feedback, setFeedback] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("proof_submissions")
        .select(`
          *,
          challenge:challenge_id!inner (
            title
          ),
          user:user_id!inner (
            name,
            email
          )
        `)
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast({ title: "Error", description: "Failed to fetch submissions", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmissionAction = async (submissionId: string, action: "approve" | "reject", feedbackText?: string) => {
    setProcessing(submissionId);
    
    try {
      const { error } = await supabase
        .from("proof_submissions")
        .update({ 
          status: action === "approve" ? "approved" : "rejected",
          feedback: feedbackText || null,
          reviewed_at: new Date().toISOString()
        })
        .eq("id", submissionId);

      if (error) throw error;

      // If approved, create a badge
      if (action === "approve") {
        const submission = submissions.find(s => s.id === submissionId);
        if (submission) {
          await createBadge(submission);
        }
      }
      
      toast({ 
        title: "Success", 
        description: `Submission ${action}d successfully` 
      });
      
      fetchSubmissions();
      setSelectedSubmission(null);
      setFeedback("");
    } catch (error) {
      console.error(`Error ${action}ing submission:`, error);
      toast({ 
        title: "Error", 
        description: `Failed to ${action} submission`, 
        variant: "destructive" 
      });
    } finally {
      setProcessing(null);
    }
  };

  const createBadge = async (submission: any) => {
    try {
      const { error } = await supabase
        .from("badges")
        .insert({
          user_id: submission.user_id,
          challenge_id: submission.challenge_id,
          title: submission.challenge?.title || "Challenge Completed",
          description: "Badge earned for completing challenge",
          story: submission.story
        });

      if (error) throw error;
    } catch (error) {
      console.error("Error creating badge:", error);
    }
  };

  const getProofTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "rejected": return "destructive";
      case "pending": return "secondary";
      default: return "outline";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin w-8 h-8 border-4 border-coral-300 border-t-coral-600 rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Proof Submissions Review</CardTitle>
          <p className="text-muted-foreground">
            Review and approve user submissions to award memory badges
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Challenge</TableHead>
                <TableHead>Proof Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {submission.user?.name?.charAt(0).toUpperCase() || 
                           submission.user?.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">{submission.user?.name || "Anonymous"}</div>
                        <div className="text-muted-foreground">{submission.user?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{submission.challenge?.title || "Unknown Challenge"}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getProofTypeIcon(submission.proof_type)}
                      <span className="capitalize">{submission.proof_type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(submission.status)}>
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(submission.submitted_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Submission</DialogTitle>
                          </DialogHeader>
                          
                          {selectedSubmission && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Challenge</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedSubmission.challenge?.title}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Submitted by</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedSubmission.user?.name || selectedSubmission.user?.email}
                                  </p>
                                </div>
                              </div>

                              {selectedSubmission.proof_url && (
                                <div>
                                  <h4 className="font-medium mb-2">Proof</h4>
                                  {selectedSubmission.proof_type === "image" ? (
                                    <img 
                                      src={selectedSubmission.proof_url} 
                                      alt="Proof submission"
                                      className="max-w-full h-auto rounded-lg border"
                                    />
                                  ) : selectedSubmission.proof_type === "video" ? (
                                    <video 
                                      src={selectedSubmission.proof_url} 
                                      controls
                                      className="max-w-full h-auto rounded-lg border"
                                    />
                                  ) : (
                                    <a 
                                      href={selectedSubmission.proof_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      View Proof
                                    </a>
                                  )}
                                </div>
                              )}

                              {selectedSubmission.story && (
                                <div>
                                  <h4 className="font-medium mb-2">Story</h4>
                                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                                    {selectedSubmission.story}
                                  </p>
                                </div>
                              )}

                              {selectedSubmission.status === "pending" && (
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Feedback (optional)</h4>
                                    <Textarea
                                      value={feedback}
                                      onChange={(e) => setFeedback(e.target.value)}
                                      placeholder="Add feedback for the user..."
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={() => handleSubmissionAction(selectedSubmission.id, "approve", feedback)}
                                      disabled={processing === selectedSubmission.id}
                                      className="flex items-center gap-2"
                                    >
                                      <Check className="h-4 w-4" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleSubmissionAction(selectedSubmission.id, "reject", feedback)}
                                      disabled={processing === selectedSubmission.id}
                                      className="flex items-center gap-2"
                                    >
                                      <X className="h-4 w-4" />
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {submission.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSubmissionAction(submission.id, "approve")}
                            disabled={processing === submission.id}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSubmissionAction(submission.id, "reject")}
                            disabled={processing === submission.id}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {submissions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No submissions found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSubmissions;