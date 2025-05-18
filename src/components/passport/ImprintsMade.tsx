
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/data/testimonials";

interface ImprintsMadeProps {
  testimonials: Testimonial[];
}

export const ImprintsMade = ({ testimonials }: ImprintsMadeProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-medium">Imprints I've Made</h2>
        <Button variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create New Imprint
        </Button>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.relationship}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()}
              </div>
            </div>
            <p className="mt-4">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
