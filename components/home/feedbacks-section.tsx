import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const FeedbacksSection = () => {
  return (
    <section className="relative w-full py-6">
      <div className="container mx-auto max-w-screen-xl">
        <h3 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Trusted by over 20,000 companies and individuals
        </h3>
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-1">
            {feedbacks.map((fb, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="aspect-video">
                    <CardHeader className="flex flex-row items-center justify-start gap-2">
                      <Avatar>
                        <AvatarImage src={fb.imageUrl} alt={fb.author} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="inline-flex flex-col">
                        <a>{fb.author}</a>
                        <small>{fb.position}</small>
                      </div>
                    </CardHeader>
                    <CardContent className="flex p-6">
                      <p>{fb.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}


const feedbacks = [
  {
    id: 1,
    author: "Hafez",
    position: "CEO",
    description: "I've been using this product for a while and I'm really impressed with the continuous improvements and the team's dedication to customer feedback. Keep up the great work!",
    imageUrl: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Adrian"
  },
  {
    id: 2,
    author: "Emily",
    position: "Marketing Manager",
    description: "This tool has been a game-changer for our marketing team. The insights we're able to gather have helped us make more informed decisions and optimize our campaigns. Highly recommended!",
    imageUrl: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Sophia"
  },
  {
    id: 3,
    author: "Liam",
    position: "Product Manager",
    description: "As a product manager, I appreciate the attention to detail and user-centric approach in the development of this platform. It's been a pleasure to work with the team and see the product evolve.",
    imageUrl: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Jade"
  },
  {
    id: 4,
    author: "Olivia",
    position: "Data Analyst",
    description: "The data visualization and analysis capabilities of this tool are top-notch. It's streamlined our workflows and enabled us to uncover valuable insights that have had a direct impact on our business objectives.",
    imageUrl: "https://api.dicebear.com/9.x/pixel-art/svg?seed=John"
  }
];