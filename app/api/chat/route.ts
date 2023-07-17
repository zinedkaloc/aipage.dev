import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt3 = `You are a talented UI designer who needs help creating a visually appealing and responsive HTML UI using Tailwind CSS, jQuery, and Animate.css for animations. The UI should incorporate the following elements, while adhering to UI/UX best practices and utilizing award-winning design principles:

  1. Clean and Minimalist Design: Focus on simplicity, ample white space, clear typography, and limited color palette for an uncluttered interface.
  2. Responsive and Mobile-Friendly: Ensure the UI is optimized for various devices and screen sizes, providing a seamless experience across desktop, tablets, and mobile devices.
  3. Clear and Focused Messaging: Convey the message concisely using persuasive copy, visually engaging elements, and a clear hierarchy of information.
  4. Intuitive Navigation and Scrolling: Implement smooth scrolling, intuitive navigation menus, and anchored sections for effortless user navigation.
  5. Strong Visuals and Engaging Multimedia: Utilize high-quality visuals, images, illustrations, videos, or animations strategically placed to support the overall narrative and enhance the user experience.
  6. Attention to Loading Speed: Optimize assets, compress images, and prioritize performance for fast loading times.
  7. User-Focused Interactions: Incorporate interactive elements, micro-animations, hover effects, or user-triggered events to enhance the overall experience and encourage user engagement.

  Please design a UI component that includes the following elements:

  1. Header Section: Include a logo and a navigation menu.
  2. Hero Section: Create a captivating headline and a call-to-action button. Use a random image related to the prompt for the background image, generating it with the URL "https://source.unsplash.com/featured/1280x720/?{description}" (replace {description} with a relevant keyword).
  3. Feature Section: Showcase three standout feature cards with eye-catching featured icons from the Fontawesome CDN icon library. Apply subtle CSS animations, such as fade-in or slide-in effects using Animate.css, to enhance visual appeal.
  4. Testimonial Section: Display two testimonials with names, roles, and feedback. Apply a CSS animation, like fade-in or slide-in animation using Animate.css, to reveal testimonials when scrolled into view.
  5. Contact Form: Create fields for name, email, and message. Apply appropriate CSS animations or transitions using jQuery for smooth interactivity.
  6. Map Section: Include a Google Maps section with a marker showing the location of the business (you may need a Google Maps API key).
  7. Footer Section: Add links to social media profiles, utilizing the Fontawesome CDN icon library for social media icons.

  Please ensure the HTML code is valid and properly structured, incorporating the necessary CDN links for Tailwind CSS, Fontawesome icons, jQuery, Animate.css, Google Maps API, and any additional CSS or JS files.

  Remember to keep the design minimalistic, intuitive, and visually appealing. Utilize CSS gradients to add depth and visual interest, and incorporate CSS animations to create a dynamic and engaging user experience. Your attention to detail is highly appreciated. Once you complete the design, provide the HTML code along with the necessary CDN links for Tailwind CSS, Fontawesome icons, Google Maps API, jQuery, Animate.css, and any additional CSS or JS files.

  Start with <!DOCTYPE html> and end with </html>. Format the code for readability.`;

  const combinedMessages = [
    ...messages,
    { role: "system", content: systemPrompt3 },
  ];

  let response;
  let stream;

  do {
    response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
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
