
import { Testimonial } from "@/data/testimonials";

interface ImprintsReceivedProps {
  testimonials: Testimonial[];
}

export const ImprintsReceived = ({ testimonials }: ImprintsReceivedProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-medium">Imprints That Moved Me</h2>
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
