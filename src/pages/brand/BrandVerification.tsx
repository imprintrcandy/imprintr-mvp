
import { useEffect, useState } from "react";
import BrandLayout from "@/components/layout/BrandLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VerificationStatus {
  id?: string;
  status: 'pending' | 'approved' | 'rejected' | 'none';
  feedback?: string;
  submitted_at?: string;
  document_url?: string;
  document_type?: string;
}

const BrandVerification = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [brandId, setBrandId] = useState<string | null>(null);
  const [verification, setVerification] = useState<VerificationStatus>({ status: 'none' });
  const [documentType, setDocumentType] = useState<string>("business_license");
  const [documentUrl, setDocumentUrl] = useState<string>("");

  useEffect(() => {
    const fetchBrandAndVerification = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Get brand profile
        const { data: brandData, error: brandError } = await supabase
          .from('brands')
          .select('id, is_verified')
          .eq('owner_id', user.id)
          .single();
          
        if (brandError && brandError.code !== 'PGRST116') {
          throw brandError;
        }
        
        if (brandData) {
          setBrandId(brandData.id);
          
          // Get verification status if any
          const { data: verificationData, error: verificationError } = await supabase
            .from('brand_verifications')
            .select('*')
            .eq('brand_id', brandData.id)
            .order('submitted_at', { ascending: false })
            .limit(1);
            
          if (verificationError) throw verificationError;
          
          if (verificationData && verificationData.length > 0) {
            setVerification({
              id: verificationData[0].id,
              status: verificationData[0].status as any,
              feedback: verificationData[0].feedback,
              submitted_at: verificationData[0].submitted_at,
              document_url: verificationData[0].document_url,
              document_type: verificationData[0].document_type,
            });
            setDocumentUrl(verificationData[0].document_url || "");
            setDocumentType(verificationData[0].document_type || "business_license");
          }
        }
      } catch (error) {
        console.error('Error fetching brand verification:', error);
        toast.error("Failed to load verification status");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBrandAndVerification();
  }, [user]);

  const handleSubmitVerification = async () => {
    if (!user || !brandId) return;
    
    if (!documentUrl) {
      toast.error("Please provide a document URL");
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Submit verification request
      const { error } = await supabase
        .from('brand_verifications')
        .insert({
          brand_id: brandId,
          document_url: documentUrl,
          document_type: documentType,
        });
        
      if (error) throw error;
      
      setVerification({
        status: 'pending',
        document_url: documentUrl,
        document_type: documentType,
        submitted_at: new Date().toISOString(),
      });
      
      toast.success("Verification request submitted successfully");
    } catch (error) {
      console.error('Error submitting verification:', error);
      toast.error("Failed to submit verification request");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusAlert = () => {
    switch(verification.status) {
      case 'approved':
        return (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Verification Approved</AlertTitle>
            <AlertDescription className="text-green-600">
              Your business is now verified on Imprintr. The verified badge will appear on your profile.
            </AlertDescription>
          </Alert>
        );
      case 'pending':
        return (
          <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-900/20">
            <Clock className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-600">Verification Pending</AlertTitle>
            <AlertDescription className="text-amber-600">
              Your verification request is being reviewed. This process typically takes 1-2 business days.
            </AlertDescription>
          </Alert>
        );
      case 'rejected':
        return (
          <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-600">Verification Rejected</AlertTitle>
            <AlertDescription className="text-red-600">
              {verification.feedback || "Your verification request was rejected. Please review the feedback and submit again with the correct documents."}
            </AlertDescription>
          </Alert>
        );
      default:
        return (
          <Alert>
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Get Verified</AlertTitle>
            <AlertDescription>
              Submit your business documentation to receive a verified badge on your profile.
            </AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <BrandLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brand Verification</h1>
          <p className="text-muted-foreground">
            Verify your business to build trust with visitors
          </p>
        </div>
        
        <Separator />
        
        {getStatusAlert()}
        
        <Card>
          <CardHeader>
            <CardTitle>Verification Documents</CardTitle>
            <CardDescription>
              Submit official documents to verify your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select 
                  value={documentType}
                  onValueChange={setDocumentType}
                  disabled={verification.status === 'pending' || verification.status === 'approved'}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business_license">Business License</SelectItem>
                    <SelectItem value="registration_certificate">Registration Certificate</SelectItem>
                    <SelectItem value="tax_certificate">Tax Certificate</SelectItem>
                    <SelectItem value="other_official_document">Other Official Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="documentUrl">Document URL</Label>
                <Input
                  id="documentUrl"
                  placeholder="https://example.com/document.pdf"
                  value={documentUrl}
                  onChange={(e) => setDocumentUrl(e.target.value)}
                  disabled={verification.status === 'pending' || verification.status === 'approved'}
                />
                <p className="text-sm text-muted-foreground">
                  Enter a URL to your document (direct file upload coming soon)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Guidelines</Label>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Accepted documents: Business license, registration certificate, tax certificate</p>
                  <p>• Documents must clearly show your business name</p>
                  <p>• Documents must be current and not expired</p>
                  <p>• File formats: PDF, JPEG, PNG</p>
                </div>
              </div>
              
              <Button 
                onClick={handleSubmitVerification} 
                disabled={submitting || verification.status === 'pending' || verification.status === 'approved' || !documentUrl}
              >
                {submitting ? "Submitting..." : "Submit for Verification"}
              </Button>
              
              {verification.status === 'rejected' && (
                <div className="space-y-2 pt-4">
                  <Label>Feedback from Review</Label>
                  <Textarea 
                    value={verification.feedback || "No specific feedback provided."}
                    readOnly
                    className="resize-none focus-visible:ring-0"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Benefits of Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="font-medium">Trust & Credibility</h3>
                <p className="text-sm text-muted-foreground">
                  Build trust with users by showing your business is legitimate and verified
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <h3 className="font-medium">Profile Badge</h3>
                <p className="text-sm text-muted-foreground">
                  Get a verified badge displayed on your profile and map location
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h3 className="font-medium">Increased Engagement</h3>
                <p className="text-sm text-muted-foreground">
                  Verified brands see higher visitor engagement and challenge participation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BrandLayout>
  );
};

export default BrandVerification;
