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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const brandCategories = [
  "Hotel",
  "Restaurant",
  "Café",
  "Bar",
  "Tourist Attraction",
  "Museum",
  "Gallery",
  "Shop",
  "Entertainment Venue",
  "Landmark",
  "Beach Resort",
  "Spa & Wellness",
  "Theme Park",
  "Nature Reserve",
  "Other"
] as const;

const daysOfWeek = [
  { value: "0", label: "Sunday" },
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
];

const profileSchema = z.object({
  name: z.string().min(2, "Brand name is required"),
  description: z.string().min(10, "Please provide a description of at least 10 characters"),
  location: z.string().min(5, "Location is required"),
  category: z.enum(brandCategories, {
    errorMap: () => ({ message: "Please select a category" }),
  }),
  logo_url: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const BrandProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [brandId, setBrandId] = useState<string | null>(null);
  const [hours, setHours] = useState<any[]>([]);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      category: brandCategories[0],
      logo_url: "",
    },
  });

  useEffect(() => {
    const fetchBrandProfile = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        const { data: brandData, error: brandError } = await supabase
          .from('brands')
          .select('*')
          .eq('owner_id', user.id)
          .single();
          
        if (brandError && brandError.code !== 'PGRST116') {
          throw brandError;
        }
        
        if (brandData) {
          setBrandId(brandData.id);
          form.reset({
            name: brandData.name || "",
            description: brandData.description || "",
            location: brandData.location || "",
            category: (brandData.category as any) || brandCategories[0],
            logo_url: brandData.logo_url || "",
          });
          
          // Fetch operating hours
          const { data: hoursData } = await supabase
            .from('brand_hours')
            .select('*')
            .eq('brand_id', brandData.id);
            
          if (hoursData && hoursData.length > 0) {
            setHours(hoursData);
          } else {
            // Initialize default hours if none exist
            const defaultHours = daysOfWeek.map(day => ({
              day_of_week: parseInt(day.value),
              open_time: "09:00",
              close_time: "17:00",
              is_closed: day.value === "0" // Sunday closed by default
            }));
            setHours(defaultHours);
          }
        }
      } catch (error) {
        console.error('Error fetching brand profile:', error);
        toast.error("Failed to load brand profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBrandProfile();
  }, [user, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // First, update or create the brand profile
      let brandIdToUpdate = brandId;
      
      if (!brandIdToUpdate) {
        // Create new brand record - ensure name is provided
        const { data: newBrand, error: createError } = await supabase
          .from('brands')
          .insert({
            name: data.name,  // Explicitly include name
            description: data.description,
            location: data.location,
            category: data.category,
            logo_url: data.logo_url,
            owner_id: user.id,
          })
          .select('id')
          .single();
          
        if (createError) throw createError;
        brandIdToUpdate = newBrand.id;
        setBrandId(brandIdToUpdate);
      } else {
        // Update existing brand
        const { error: updateError } = await supabase
          .from('brands')
          .update({
            name: data.name,  // Explicitly include name
            description: data.description,
            location: data.location,
            category: data.category,
            logo_url: data.logo_url,
          })
          .eq('id', brandIdToUpdate);
          
        if (updateError) throw updateError;
      }
      
      toast.success("Brand profile updated successfully");
    } catch (error) {
      console.error('Error updating brand profile:', error);
      toast.error("Failed to update brand profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrandLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brand Profile</h1>
          <p className="text-muted-foreground">
            Manage your business profile and contact information
          </p>
        </div>
        
        <Separator />
        
        <div className="grid gap-6 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business details and information visible to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of your business as it will appear to users
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select business category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brandCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the category that best describes your business
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell visitors about your business..."
                            className="resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide details about your brand, history, and what makes it special
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, City, Country" {...field} />
                        </FormControl>
                        <FormDescription>
                          Full address for visitors to find your location
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="logo_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/logo.png" {...field} />
                        </FormControl>
                        <FormDescription>
                          Link to your brand logo (we'll add upload capability soon)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
              <CardDescription>
                Set your business opening and closing times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Operating hours functionality will be implemented soon. You'll be able to set specific times for each day of the week.
                </p>
                
                <div className="grid gap-4">
                  {daysOfWeek.map((day) => (
                    <div key={day.value} className="grid grid-cols-12 items-center gap-2">
                      <div className="col-span-3">
                        <Label>{day.label}</Label>
                      </div>
                      <div className="col-span-9 flex items-center gap-3">
                        <Input 
                          type="time" 
                          defaultValue="09:00" 
                          className="w-32" 
                          disabled={true}
                        />
                        <span>to</span>
                        <Input 
                          type="time" 
                          defaultValue="17:00" 
                          className="w-32" 
                          disabled={true}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          disabled={true}
                        >
                          {day.value === "0" ? "Closed" : "Open"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button disabled={true}>
                  Save Hours
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BrandLayout>
  );
};

export default BrandProfile;
