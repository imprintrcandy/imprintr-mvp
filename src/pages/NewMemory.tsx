
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { MemoryForm } from "@/components/memory/MemoryForm";
import { Memory } from "@/components/memory/MemoryCard";
import { SAMPLE_MEMORIES } from "@/data/memories";

const NewMemory = () => {
  const navigate = useNavigate();

  const handleSaveMemory = (memory: Memory) => {
    // In a real app with backend, we would save the memory to the database
    // Here we'll just simulate it by adding to our sample data
    const newSampleMemories = [memory, ...SAMPLE_MEMORIES];
    console.log("Memory saved:", memory);
    console.log("Updated memories:", newSampleMemories);
    
    // Navigate back to the passport/memories page
    navigate("/passport");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Create New Memory</h1>
        
        <div className="max-w-3xl mx-auto">
          <MemoryForm onSave={handleSaveMemory} />
        </div>
      </div>
    </MainLayout>
  );
};

export default NewMemory;
