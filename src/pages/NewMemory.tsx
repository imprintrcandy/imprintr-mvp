
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ImprintForm } from "@/components/memory/MemoryForm";
import { Imprint } from "@/components/memory/MemoryCard";
import { SAMPLE_IMPRINTS } from "@/data/memories";

const NewImprint = () => {
  const navigate = useNavigate();

  const handleSaveImprint = (imprint: Imprint) => {
    // In a real app with backend, we would save the imprint to the database
    // Here we'll just simulate it by adding to our sample data
    const newSampleImprints = [imprint, ...SAMPLE_IMPRINTS];
    console.log("Imprint saved:", imprint);
    console.log("Updated imprints:", newSampleImprints);
    
    // Navigate back to the passport/imprints page
    navigate("/passport");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Create New Imprint</h1>
        
        <div className="max-w-3xl mx-auto">
          <ImprintForm onSave={handleSaveImprint} />
        </div>
      </div>
    </MainLayout>
  );
};

export default NewImprint;
