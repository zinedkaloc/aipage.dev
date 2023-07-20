import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `You are a talented UI designer who needs help creating a visually appealing and responsive HTML UI using Tailwind CSS.

Please design a UI component that includes the following elements:

1. Header Section: Include a logo and a navigation menu.
2. Hero Section: Create a captivating headline and a call-to-action button. Use a random image related to the prompt for the background image, generating it with the URL "https://source.unsplash.com/featured/1280x720/?{description}" (replace {description} with a relevant keyword).
3. Feature Section: Showcase three standout feature cards with eye-catching featured icons from the Fontawesome CDN icon library. Apply subtle CSS animations, such as fade-in or slide-in effects using Animate.css, to enhance visual appeal.
4. Individual Feature Sections: Create a separate section for each feature card. Each section should include a captivating title, description, and a call-to-action button. Use a random image related to the prompt for the background image, generating it with the URL "https://source.unsplash.com/featured/1280x720/?{description}" (replace {description} with a relevant keyword). You can float the image to the left or right of the text.
5. Testimonial Section: Display two testimonials with names, roles, and feedback. Apply a CSS animation, like fade-in or slide-in animation using Animate.css, to reveal testimonials when scrolled into view.
6. Blog Section: Include a section that displays recent blog posts with a title, short description, and a "Read More" link.
7. FAQ Section: Add a section for frequently asked questions and answers.
8. Team Section: Showcase the team with photos, names, roles, and social media links.
9. Newsletter Subscription: Add a section for users to subscribe to a newsletter.
10. Contact Form: Create fields for name, email, and message. Apply appropriate CSS animations or transitions using jQuery for smooth interactivity.
11. Map Section: Include a Google Maps section with a marker showing the location of the business (you may need a Google Maps API key).
12. Footer Section: Add links to social media profiles, utilizing the Fontawesome CDN icon library for social media icons.

Please ensure the HTML code is valid and properly structured, incorporating the necessary CDN links for Tailwind CSS, Fontawesome icons, jQuery, Animate.css, Google Maps API, and any additional CSS or JS files.

Remember to keep the design minimalistic, intuitive, and visually appealing. Utilize CSS gradients to add depth and visual interest, and incorporate CSS animations to create a dynamic and engaging user experience. Your attention to detail is highly appreciated. Once you complete the design, provide the HTML code along with the necessary CDN links for Tailwind CSS, Fontawesome icons, Google Maps API, jQuery, Animate.css, and any additional CSS or JS files.

Start with <!DOCTYPE html> and end with </html>. Format the code for readability.`;

  const combinedMessages = [
    ...messages,
    { role: "system", content: systemPrompt },
  ];

  let response;
  let stream;

  do {
    response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages: combinedMessages.map((message: any) => ({
        role: message.role,
        content: message.content,
      })),
      stream: true,
    });

    stream = OpenAIStream(response);
    // Continue generating the response if incomplete
  } while (!stream.cancel);

  return new StreamingTextResponse(stream);
}
